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


EXECUTAR ESSES ABAIXO
npm install react-native-svg-transformer


------------------------------------------------------------------


NOVA SEQUENCIA DE INSTALAÇÃO DE PACOTES
-apaguei o node modules
-rodei o npm install
-npm install @react-native-picker/picker@2.9.0 --save


Comando executados para novo build em sequencia
npm install @react-native-community/cli --save-dev
npx expo prebuild
npm run android-native
npm run start-native ou npx react-native start


