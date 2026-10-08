import { View, Text, Pressable, StyleSheet, Image, ImageBackground } from "react-native";

export default function HomeScreen({ navigation }: any) {
  return (
    <ImageBackground
      // Altere a rota abaixo para o nome exato do arquivo de imagem do seu background
      source={require("../../assets/hometxt.jpg")} 
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      {/* Camada semitransparente por cima do fundo para dar leitura aos textos */}
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Símbolo decorativo TXT (+X+) */}
          <View style={styles.txtLogoContainer}>
            <Text style={styles.txtLogoSymbol}>+X+</Text>
          </View>

          {/* Título e Subtítulo */}
          <View style={styles.titleContainer}>
            <Text style={styles.title}>TXT</Text>
            <Text style={styles.camera}>CAM SNAP</Text>
          </View>

          <Text style={styles.description}>
            TOMORROW X TOGETHER PHOTO STUDIO
          </Text>

          <Image 
            source={require('../../assets/txt_logo-removebg-preview.png')} 
            style={styles.logoImage} 
            resizeMode="contain" 
          /> 

          {/* Botão Principal */}
          <Pressable
            style={({ pressed }) => [
              styles.button,
              pressed && styles.buttonPressed,
            ]}
            onPress={() => navigation.navigate("Camera")}
          >
            <Text style={styles.buttonText}>ABRIR CÂMERA</Text>
          </Pressable>

          {/* Rodapé com lema do TXT */}
          <Text style={styles.footer}>
            YOU AND I, DIFFERENT BUT TOGETHER
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(11, 14, 20, 0.65)", // Ajuste a opacidade (0.65) se quiser o fundo mais claro ou mais escuro
  },

  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
  },

  txtLogoContainer: {
    marginBottom: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "rgba(0, 229, 255, 0.15)",
    borderWidth: 1,
    borderColor: "rgba(0, 229, 255, 0.4)",
  },

  txtLogoSymbol: {
    color: "#00E5FF",
    fontSize: 28,
    fontWeight: "900",
    letterSpacing: 6,
  },

  titleContainer: {
    alignItems: "center",
    marginBottom: 12,
  },

  title: {
    color: "#00E5FF",
    fontSize: 52,
    fontWeight: "900",
    letterSpacing: 4,
  },

  camera: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "700",
    letterSpacing: 6,
    marginTop: -4,
  },

  description: {
    color: "#00F5D4",
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 2,
    marginBottom: 20,
    textAlign: "center",
  },

  logoImage: {
    width: 160,
    height: 160,
    marginBottom: 30,
  },

  button: {
    width: "100%",
    maxWidth: 280,
    height: 54,
    backgroundColor: "#00E5FF",
    borderRadius: 27,
    alignItems: "center",
    justifyContent: "center",

    elevation: 8,
    shadowColor: "#00E5FF",
    shadowOpacity: 0.5,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },

  buttonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.97 }],
  },

  buttonText: {
    color: "#0B0E14",
    fontSize: 15,
    fontWeight: "900",
    letterSpacing: 1.5,
  },

  footer: {
    position: "absolute",
    bottom: 28,
    color: "#E0E6ED",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 2,
    textAlign: "center",
  },
});