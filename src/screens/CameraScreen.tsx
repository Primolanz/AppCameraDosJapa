import {
  CameraView,
  useCameraPermissions,
  CameraViewRef,
} from 'expo-camera';

import {
  View,
  Text,
  Pressable,
  StyleSheet,
  FlatList,
  Image,
} from 'react-native';

import { useRef, useState } from 'react';

export default function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraViewRef>(null);
  const [cameraReady, setCameraReady] = useState(false);
  const [takingPhoto, setTakingPhoto] = useState(false);
  
  // Estado que guarda as URIs das fotos tiradas
  const [photos, setPhotos] = useState<string[]>([]);

  // 1. Verificando permissão inicial
  if (!permission) {
    return (
      <View style={styles.messageContainer}>
        <Text style={styles.message}>
          Verificando permissão da câmera...
        </Text>
      </View>
    );
  }

  // 2. Trata permissão negada ou não concedida
  if (!permission.granted) {
    return (
      <View style={styles.messageContainer}>
        <Text style={styles.txtBadge}>+X+</Text>
        <Text style={styles.message}>
          Precisamos da sua permissão para acessar a câmera e criar registros do TXT!
        </Text>

        <Pressable
          style={styles.permissionButton}
          onPress={requestPermission}
        >
          <Text style={styles.permissionButtonText}>
            PERMITIR CÂMERA
          </Text>
        </Pressable>
      </View>
    );
  }

  // 3. Função para tirar a foto
  const takePhoto = async () => {
    // Evita chamadas duplicadas enquanto tira a foto ou se a câmera não estiver pronta
    if (!cameraRef.current || !cameraReady || takingPhoto) {
      return;
    }

    try {
      setTakingPhoto(true);
      const photo = await cameraRef.current.takePictureAsync();

      if (photo?.uri) {
        // Adiciona a foto no topo do array (a mais recente primeiro)
        setPhotos((prevPhotos) => [photo.uri, ...prevPhotos]);
      }
    } catch (error) {
      console.log('Erro ao tirar foto:', error);
    } finally {
      setTakingPhoto(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Metade Superior: Pré-visualização da Câmera */}
      <View style={styles.cameraContainer}>
        <CameraView
          ref={cameraRef}
          style={styles.camera}
          facing="back"
          onCameraReady={() => setCameraReady(true)}
        />
        <View style={styles.topOverlay}>
          <Text style={styles.watermark}>+X+ MOA SNAP</Text>
        </View>
      </View>

      {/* Metade Inferior: Botão e Galeria */}
      <View style={styles.galleryContainer}>
        {/* Botão de captura e texto de status */}
        <View style={styles.controls}>
          <Pressable
            style={({ pressed }) => [
              styles.captureButton,
              (!cameraReady || takingPhoto) && styles.captureButtonDisabled,
              pressed && styles.captureButtonPressed,
            ]}
            onPress={takePhoto}
            disabled={!cameraReady || takingPhoto}
          >
            <View style={styles.captureButtonInner} />
          </Pressable>

          <Text style={styles.status}>
            {!cameraReady
              ? 'Inicializando câmera...'
              : takingPhoto
              ? 'Capturando...'
              : 'Toque para registrar'}
          </Text>
        </View>

        {/* Galeria de Fotos em Grade abaixo do botão */}
        <View style={styles.gridSection}>
          <Text style={styles.galleryTitle}>GALERIA MOA ({photos.length})</Text>
          
          <FlatList
            data={photos}
            keyExtractor={(item, index) => index.toString()}
            numColumns={3}
            contentContainerStyle={styles.listContent}
            renderItem={({ item }) => (
              <Image source={{ uri: item }} style={styles.thumbnail} />
            )}
            ListEmptyComponent={
              <Text style={styles.emptyText}>
                Nenhuma foto tirada ainda.
              </Text>
            }
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0E14',
  },

  cameraContainer: {
    height: '50%',
    width: '100%',
    overflow: 'hidden',
  },

  camera: {
    flex: 1,
  },

  topOverlay: {
    position: 'absolute',
    top: 40,
    alignSelf: 'center',
    backgroundColor: 'rgba(11, 14, 20, 0.7)',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(0, 229, 255, 0.4)',
  },

  watermark: {
    color: '#00E5FF',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 2,
  },

  galleryContainer: {
    flex: 1,
    backgroundColor: '#0B0E14',
    paddingHorizontal: 16,
    paddingTop: 16,
  },

  controls: {
    alignItems: 'center',
    marginBottom: 16,
  },

  captureButton: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: '#00E5FF',
  },

  captureButtonInner: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#00E5FF',
  },

  captureButtonPressed: {
    transform: [{ scale: 0.92 }],
  },

  captureButtonDisabled: {
    opacity: 0.4,
  },

  status: {
    color: '#8A99AD',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 6,
    letterSpacing: 1,
  },

  gridSection: {
    flex: 1,
  },

  galleryTitle: {
    color: '#00E5FF',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.5,
    marginBottom: 10,
  },

  listContent: {
    paddingBottom: 20,
  },

  thumbnail: {
    width: '31%',
    aspectRatio: 1,
    margin: '1.1%',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(0, 229, 255, 0.3)',
  },

  emptyText: {
    color: '#5A6578',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 20,
    fontStyle: 'italic',
  },

  messageContainer: {
    flex: 1,
    backgroundColor: '#0B0E14',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },

  txtBadge: {
    color: '#00E5FF',
    fontSize: 32,
    fontWeight: '900',
    letterSpacing: 4,
    marginBottom: 20,
  },

  message: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 25,
    lineHeight: 22,
  },

  permissionButton: {
    backgroundColor: '#00E5FF',
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 25,
  },

  permissionButtonText: {
    color: '#0B0E14',
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 1,
  },
});