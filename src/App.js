import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import ChatBot from 'react-simple-chatbot';
import theme from './theme';

const config = {
  botAvatar: "img.png",
  floating: true,
};
function App() {
  const [messages, setMessages] = useState([]);

  

  function handleKeyDown(event) {
    if (event.key === 'Enter' && event.target.value) {
      handleUserInput(event.target.value);
      event.target.value = '';
    }
  }

  const steps = [
    {
      id: '0',
      message: 'Hello! What is your name?',
      trigger: '1',
    },
    {
      id: '1',
      user: true,
      metadata: {
        name: 'name',
        value: '{{{raw}}}'
      },
      trigger: '2',
    },
    {
      id: '2',
      message: 'Nice to meet you, {previousValue}! Welcome to our restaurant. What type of food would you like to order today?',
      trigger: '3',
    },
    {
      id: '3',
      //message: 'What type of food would you like to order?',
      options: [
        { value: 'burger', label: 'Burger', trigger: '4' },
        { value: 'pizza', label: 'Pizza', trigger: '4' },
        { value: 'pasta', label: 'Pasta', trigger: '4' },
        { value: 'drink', label: 'Drink', trigger: '5' },
      ],
    },
    {
      id: '4',
      message: 'How many would you like to order?',
      trigger: 'food',
    },
    {
      id: '5',
      message: 'Would you like to order a drink?',
      trigger: '7',
    },
    {
      id: 'food',
      user: true,
     
      validator: (value) => {
        if (isNaN(value)) {
          return 'Please enter quantity';
        } else if (value < 1) {
          return 'Please enter a valid quantity';
        } else {
          return true;
        }
      },
      trigger: '5',
    },
    {
      id: '7',
      options: [
        { value: 'water', label: 'Water', trigger: '6' },
        { value: 'soda', label: 'Soda', trigger: '6' },
        { value: 'juice', label: 'Juice', trigger: '6' },
        { value: 'No', label: 'No', trigger: '8' },
      ],
    },
  
    {
      id: '6',
      user: true,
      validator: (value) => {
        if (isNaN(value)) {
          return 'Please enter quantity';
        } else if (value < 1) {
          return 'Please enter a valid quantity';
        } else {
          return true;
        }
      },
      trigger: '8',
    },
    {
      id: '8',
      message: 'Great! Your order has been placed. Would you like to order anything else?',
      trigger: '9',
    },
    {
      id: '9',
      options: [
        { value: 'yes', label: 'Yes', trigger: '3' },
        { value: 'no', label: 'No', trigger: '10' },
      ],
    },
    {
      id: '10',
      message: 'Thank you for your order, {previousValue}! We will prepare it right away.',
      end: true,
    },
  ];

  return (
    <div>
      <ThemeProvider theme={theme}>
        <ChatBot
          headerTitle="NoshBot"
          steps={handleUserInput(steps)}
          {...config}
          cache={true}  
          placeholder="Type your message here..."
          userAvatar={null}
        />
      </ThemeProvider>
    </div>
  );
}

export default App;
