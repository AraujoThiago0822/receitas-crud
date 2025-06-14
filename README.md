📱 App de Receitas com React Native + Expo + SQLite
Bem-vindo ao Receitas App!
Este projeto é um aplicativo mobile desenvolvido em React Native utilizando Expo e banco de dados local SQLite. O objetivo é permitir o cadastro, busca, edição e exclusão de receitas de forma simples e eficiente.

✨ Funcionalidades
Adicionar Receita: Cadastre novas receitas com título, ingredientes e modo de preparo.

Editar Receita: Atualize informações de receitas já cadastradas.

Excluir Receita: Remova receitas que não deseja mais manter.

Listar Receitas: Veja todas as receitas cadastradas em uma lista.

Buscar Receita: Encontre receitas rapidamente pelo título.

🛠️ Tecnologias Utilizadas
React Native

Expo

expo-sqlite (nova API)

TypeScript

🚀 Como Rodar o Projeto
Clone o repositório:

bash
git clone https://github.com/seu-usuario/receitas-app.git
cd receitas-app
Instale as dependências:

bash
npm install
# ou
yarn install
Instale o expo-sqlite:

bash
npx expo install expo-sqlite
Inicie o projeto:

bash
npx expo start
Abra no seu emulador ou dispositivo físico usando o app Expo Go.

📸 Prints da Aplicação
Adicione aqui os prints das telas do seu app para mostrar as funcionalidades!

Tela inicial:

![Screenshot_1749905490](https://github.com/user-attachments/assets/4d0e52f4-5a99-4202-8217-841e8cc06558)
![Screenshot_1749906872](https://github.com/user-attachments/assets/aa25ce0a-35f1-4395-af98-caa61a690b6b)
![Screenshot_1749906866](https://github.com/user-attachments/assets/08030a2c-94cf-4be1-8414-33d246f50cd8)
![Screenshot_1749906843](https://github.com/user-attachments/assets/fd0fb9df-f33c-4253-911a-222024eab736)
![Screenshot_1749906606](https://github.com/user-attachments/assets/a18cb196-5fef-428f-976a-c3c96654146b)

text
src/
  components/
    RecipeCard.tsx
  database/
    DatabaseSetup.ts
    RecipeService.ts
  pages/
    Home.tsx
  styles/
    styles.ts
App.tsx
💡 Observações
O app utiliza a nova API síncrona do expo-sqlite (openDatabaseSync, withTransactionSync, runSync, getAllSync).

O banco de dados é local e persistente, funcionando mesmo offline.

O código está organizado para facilitar a manutenção e expansão.

