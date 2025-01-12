# Projeto React Native

Este repositório contém um projeto criado com **React Native** utilizando o **Expo**. Abaixo estão as instruções para configurar, executar e gerar o APK do aplicativo.

---

## 📦 Criar um Novo Projeto

Para criar um novo projeto com **Expo**, utilize o comando:

```bash
npx create-expo-app --template
```

---

## ▶️ Executar o Projeto

Você pode iniciar o projeto utilizando um dos seguintes comandos:

### Com **Expo CLI**:
```bash
expo start
```

### Alternativamente, com **npx**:
```bash
npx expo start
```

---

## 📱 Gerar APK

Siga os passos abaixo para configurar e gerar o APK do aplicativo:

1. Instale a CLI do **EAS** globalmente:
   ```bash
   npm install -g eas-cli
   ```

2. Configure o EAS Build:
   ```bash
   eas build:configure
   ```

3. Gere o APK:
   ```bash
   eas build --platform android --profile preview
   ```

---

## 📥 Instalação de Pacotes

Certifique-se de instalar as dependências necessárias para o projeto. Abaixo estão os comandos:

1. **Axios**:
   ```bash
   npm install axios
   ```

2. **Datetime Picker**:
   ```bash
   npm install @react-native-community/datetimepicker
   ```

3. **Tipos para Vector Icons** (desenvolvimento):
   ```bash
   npm install --save-dev @types/react-native-vector-icons
   ```

4. **Menus**
   ```bash
   npm install @react-native-picker/picker
   ```

5**Navegação**
   ```bash
   npm install @react-navigation/native
   ```


npm install @react-navigation/native @react-navigation/stack
npm install react-native-screens react-native-safe-area-context react-native-gesture-handler react-native-reanimated react-native-vector-icons @react-native-community/masked-view

npm install date-fns


---

## 💡 Observações

- Certifique-se de ter o **Node.js** e o **Expo CLI** instalados corretamente no ambiente.
- Use o aplicativo **Expo Go** no dispositivo para testar o projeto durante o desenvolvimento.
- Para outras plataformas (iOS ou Web), o **Expo** suporta execução direta com comandos semelhantes.
