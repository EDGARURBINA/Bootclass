class Question {
    constructor(
      public text: string,
      public options: string[],
      public correctAnswer: string
    ) {}
  
    isCorrect(answer: string): boolean {
      return answer.toLowerCase() === this.correctAnswer.toLowerCase();
    }
  }
  
  class QuizBot {
    private questions: Question[] = [];
    private currentLevel: number = 1;
    private score: number = 0;
    private maxLevel: number = 10;
  
    constructor() {
      this.generateQuestions();
    }
  
    private generateQuestions(): void {
      // Niveles por el momento solo puse 10
      this.questions = [
        // Nivel 1
        new Question(
          "¿Qué hace la expresión `\\d+` en regex?", 
          ["Coincide con una o más letras", "Coincide con uno o más dígitos", "Coincide con uno o más espacios"], 
          "Coincide con uno o más dígitos"
        ),
        // Nivel 2
        new Question(
          "¿Qué significa `^` en una expresión regular?", 
          ["Inicio de línea", "Fin de línea", "Negación dentro de corchetes"], 
          "Inicio de línea"
        ),
        // Nivel 3
        new Question(
          "¿Para qué sirve `[a-z]` en regex?", 
          ["Coincide con cualquier letra minúscula", "Coincide con 'a' y 'z' solamente", "Coincide con cualquier letra mayúscula"], 
          "Coincide con cualquier letra minúscula"
        ),
        // Nivel 4
        new Question(
          "¿Qué hace `\\s` en regex?", 
          ["Coincide con cualquier espacio en blanco", "Coincide con el carácter 's'", "Coincide con cualquier carácter"], 
          "Coincide con cualquier espacio en blanco"
        ),
        // Nivel 5
        new Question(
          "¿Qué hace el cuantificador `*` en regex?", 
          ["Coincide con exactamente un carácter", "Coincide con cero o más caracteres", "Coincide con uno o más caracteres"], 
          "Coincide con cero o más caracteres"
        ),
        // Nivel 6
        new Question(
          "¿Qué hace el cuantificador `+` en regex?", 
          ["Coincide con cero o más caracteres", "Coincide con uno o más caracteres", "Coincide con exactamente un carácter"], 
          "Coincide con uno o más caracteres"
        ),
        // Nivel 7
        new Question(
          "¿Qué hace `\\b` en regex?", 
          ["Coincide con un límite de palabra", "Coincide con un backspace", "Coincide con un espacio en blanco"], 
          "Coincide con un límite de palabra"
        ),
        // Nivel 8
        new Question(
          "¿Qué hace la expresión `(a|b)` en regex?", 
          ["Coincide con 'a' o 'b'", "Coincide con 'ab'", "Agrupa 'a' y 'b' juntos"], 
          "Coincide con 'a' o 'b'"
        ),
        // Nivel 9
        new Question(
          "¿Qué hace `\\w` en regex?", 
          ["Coincide con cualquier carácter de palabra (letras, números, guion bajo)", "Coincide con espacios en blanco", "Coincide solo con letras"], 
          "Coincide con cualquier carácter de palabra (letras, números, guion bajo)"
        ),
        // Nivel 10
        new Question(
          "¿Qué significa `{3}` en regex?", 
          ["Coincide exactamente 3 veces", "Coincide al menos 3 veces", "Coincide hasta 3 veces"], 
          "Coincide exactamente 3 veces"
        ),
      ];
    }
  
    start(): void {
      console.log(" ¡Bienvenido al QuizBot de Expresiones Regulares!");
      console.log(" Instrucciones: Responde las preguntas para acumular puntos. Puedes avanzar incluso si fallas.");
      console.log(" El jugador con mayor puntuación gana.");
      this.askQuestion();
    }
  
    private askQuestion(): void {
      if (this.currentLevel > this.maxLevel) {
        this.showFinalScore();
        return;
      }
      
      const question = this.questions[this.currentLevel - 1];
      console.log(`\n🔹 Nivel ${this.currentLevel} de ${this.maxLevel}`);
      console.log(`❓ ${question.text}`);
      question.options.forEach((opt, index) => console.log(`${index + 1}. ${opt}`));
    }
  
    answer(input: string): void {
      const question = this.questions[this.currentLevel - 1];
  
      if (question.isCorrect(input)) {
        console.log("¡Respuesta correcta!");
        this.score++;
        console.log(` Puntuación actual: ${this.score}`);
      } else {
        console.log(" Respuesta incorrecta.");
        console.log(` La respuesta correcta era: "${question.correctAnswer}"`);
        console.log(` Puntuación actual: ${this.score}`);
      }
      
      // el jugador Siempre avanza al siguiente nivel, incluso si la respuesta es incorrecta
      this.currentLevel++;
      
      if (this.currentLevel <= this.maxLevel) {
        console.log(` Avanzando al Nivel ${this.currentLevel}...\n`);
        this.askQuestion();
      } else {
        this.showFinalScore();
      }
    }
  
    private showFinalScore(): void {
      console.log(`\n ¡Juego completado!`);
      console.log(`Tu puntuación final: ${this.score} de ${this.maxLevel} posibles.`);
      
      // Mensaje según la puntuación que se pueden agregar en el front
      if (this.score === this.maxLevel) {
        console.log(" ¡Perfecto! Eres un experto en expresiones regulares.");
      } else if (this.score >= this.maxLevel * 0.7) {
        console.log(" ¡Muy bien! Tienes un buen conocimiento de expresiones regulares.");
      } else if (this.score >= this.maxLevel * 0.5) {
        console.log("¡No está mal! Tienes conocimientos básicos de expresiones regulares.");
      } else {
        console.log(" Sigue practicando para mejorar tu conocimiento de expresiones regulares.");
      }
    }
  
    getCurrentLevel(): number {
      return this.currentLevel;
    }
  
    getScore(): number {
      return this.score;
    }
  }
  
  // Uso del bot
  const bot = new QuizBot();
  bot.start();