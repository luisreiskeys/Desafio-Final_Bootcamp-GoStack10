/* eslint-disable no-undef */
import React, { createRef, useState } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Platform,
  ActivityIndicator,
} from 'react-native';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RNCamera } from 'react-native-camera';

import api from '../../../services/api';
import { showToast } from '../../../store/modules/toast/actions';

import { Container, TopBg, Content, Preview, SubmitButton } from './styles';

export default function ConfirmDelivery({ route, navigation }) {
  const dispatch = useDispatch();
  const id = route.params?.id ?? null;
  const profile = useSelector((state) => state.user.profile);

  const styles = StyleSheet.create({
    preview: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
      borderRadius: 10,
    },
    capture: {
      flex: 0,
      backgroundColor: 'rgba(0,0,0,0.4)',
      position: 'absolute',
      height: 70,
      width: 70,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50,
      alignSelf: 'center',
      bottom: 25,
    },
    iconWrapper: {
      flex: 0,
      flexDirection: 'row',
      justifyContent: 'center',
    },
    descartButton: {
      position: 'absolute',
      padding: 10,
      backgroundColor: '#7d40e7',
      borderRadius: 4,
      top: 15,
      right: 15,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    descartText: {
      color: '#fff',
      marginLeft: 10,
      fontWeight: 'bold',
    },
  });

  const [image, setImage] = useState(null);
  const [loadingImage, setLoadingImage] = useState(false);
  const [loading, setLoading] = useState(false);

  const camera = createRef();
  async function takePicture() {
    if (camera.current) {
      setLoadingImage(true);
      const options = { quality: 0.3 };
      const data = await camera.current.takePictureAsync(options);
      setImage(data);
      setLoadingImage(false);
    }
  }

  async function handleSubmit() {
    if (!image) {
      dispatch(
        showToast(
          'error',
          'Você precisa tirar uma foto da assinatura para concluir a entrega'
        )
      );
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append('file', {
      name: image.uri,
      uri:
        Platform.OS === 'android'
          ? image.uri
          : image.uri.replace('file://', ''),
    });

    const response = await api.post('signatures', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (!response.data.id) {
      dispatch(
        showToast(
          'error',
          'Erro ao tentar fazer o upload da imagem, tente novamente mais tarde'
        )
      );
      return;
    }

    await api.put(`/deliveryman/${profile.id}/deliveries/${id}`, {
      end_date: new Date(),
      signature_id: response.data.id,
    });

    dispatch(showToast('success', 'encomenda concluída com sucesso'));
    navigation.navigate('Dashboard');
    setLoading(false);
  }

  return (
    <Container>
      <TopBg />
      <Content>
        {image !== null ? (
          <Preview source={{ uri: image.uri }} />
        ) : (
          <RNCamera
            ref={camera}
            style={styles.preview}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.on}
            androidCameraPermissionOptions={{
              title: 'Permission to use camera',
              message: 'We need your permission to use your camera',
              buttonPositive: 'Ok',
              buttonNegative: 'Cancel',
            }}
            androidRecordAudioPermissionOptions={{
              title: 'Permission to use audio recording',
              message: 'We need your permission to use your audio',
              buttonPositive: 'Ok',
              buttonNegative: 'Cancel',
            }}
          />
        )}
        {image ? (
          <TouchableOpacity
            style={styles.descartButton}
            onPress={() => setImage(null)}
          >
            <Icon name="delete" size={26} color="#fff" />
            <Text style={styles.descartText}>Descartar</Text>
          </TouchableOpacity>
        ) : (
          <View style={[styles.iconWrapper]}>
            <TouchableOpacity onPress={takePicture} style={styles.capture}>
              {loadingImage ? (
                <ActivityIndicator style={{ color: '#FFF' }} />
              ) : (
                <Icon name="camera" size={26} color="#fff" />
              )}
            </TouchableOpacity>
          </View>
        )}
      </Content>

      <SubmitButton loading={loading} onPress={handleSubmit}>
        Enviar
      </SubmitButton>
    </Container>
  );
}

ConfirmDelivery.propTypes = {
  route: PropTypes.shape().isRequired,
  navigation: PropTypes.shape().isRequired,
};
