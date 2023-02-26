class Message {
    constructor(id, text) {
      this.id = id;
      this.text = text;
    }
  
    static getAll() {
      // aquí deberías buscar y devolver todos los mensajes almacenados en tu base de datos
      const messages = [
        { id: 1, text: 'Hola mundo!' },
        { id: 2, text: 'Este es un mensaje de prueba' },
        { id: 3, text: '¿Cómo estás?' },
      ];
      return messages;
    }
  
    static create(text) {
      // aquí deberías almacenar el mensaje en tu base de datos y devolver el mensaje recién creado con su ID generado
      const newMessage = new Message(4, text);
      return newMessage;
    }
  }
  
  module.exports = Message;