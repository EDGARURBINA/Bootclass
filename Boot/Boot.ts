class Question {
    constructor(
      public text: string,
      public options: string[],
      public correctAnswer: string,
      public pattern: string
    ) {}
  
    isCorrect(answer: string): boolean {
      return answer.toLowerCase() === this.correctAnswer.toLowerCase();
    }
  
    // Método para explicar por qué un patrón coincide o no con una respuesta
    explainMatch(answer: string): string {
      const regex = new RegExp(this.pattern);
      const isMatch = regex.test(answer);
  
      // Explicaciones específicas según el patrón
      switch (this.pattern) {
        case "^c[aeiou]sa$":
          return `El patrón "${this.pattern}" busca palabras que comienzan con 'c', seguido de cualquier vocal (a,e,i,o,u), seguido de 'sa', y nada más. En "${answer}" ${!isMatch ? "no se cumple esta estructura." : "se cumple perfectamente esta estructura."}`;
  
        case "^m[aeiou]r[aeiou]$":
          return `El patrón "${this.pattern}" busca palabras que comienzan con 'm', seguido de cualquier vocal, luego 'r', otra vocal, y nada más. En "${answer}" ${!isMatch ? "no se cumple este patrón." : "se cumple este patrón."}`;
  
        case "^p[aeiou]t[aeiou]$":
          return `El patrón "${this.pattern}" busca palabras que comienzan con 'p', seguido de cualquier vocal, luego 't', otra vocal, y nada más. En "${answer}" ${!isMatch ? "no se cumple este patrón." : "se cumple este patrón."}`;
        
        case "^b[aeiou]ll[aeiou]$":
          return `El patrón "${this.pattern}" busca palabras que comienzan con 'b', seguido de una vocal, luego 'll', otra vocal, y nada más. En "${answer}" ${!isMatch ? "no se cumple este patrón." : "se cumple este patrón."}`;
        
        case "^ca+sa$":
          return `El patrón "${this.pattern}" busca palabras que comienzan con 'c', seguido de 'a' una o más veces (por el '+'), luego 'sa', y nada más. En "${answer}" ${!isMatch ? "no hay suficientes 'a' o la estructura es diferente." : "se cumple este patrón con múltiples 'a'."}`;
        
        case "^[A-Z][a-z]{3}[0-9]$":
          if (!isMatch) {
            if (!/^[A-Z]/.test(answer)) {
              return `El patrón "${this.pattern}" requiere una letra mayúscula al inicio. "${answer}" no comienza con mayúscula.`;
            } else if (!/^[A-Z][a-z]{3}/.test(answer)) {
              return `El patrón "${this.pattern}" requiere exactamente 3 letras minúsculas después de la mayúscula. "${answer}" no cumple este requisito.`;
            } else if (!/[0-9]$/.test(answer)) {
              return `El patrón "${this.pattern}" requiere un dígito al final. "${answer}" no termina con un número.`;
            } else {
              return `La longitud o estructura de "${answer}" no coincide con el patrón "${this.pattern}".`;
            }
          } else {
            return `El patrón "${this.pattern}" busca una mayúscula, seguida de exactamente 3 minúsculas y termina con un dígito. "${answer}" cumple perfectamente.`;
          }
        
        case "^(gato|perro)s?$":
          return `El patrón "${this.pattern}" busca exactamente la palabra "gato" o "perro", opcionalmente seguida de una 's' (singular o plural). "${answer}" ${!isMatch ? "no coincide con este patrón." : "coincide con este patrón."}`;
        
        case "^[^aeiou]{3}[aeiou]r$":
          return `El patrón "${this.pattern}" busca 3 caracteres que NO sean vocales (por el [^aeiou]), seguidos de una vocal y terminando en 'r'. "${answer}" ${!isMatch ? "no cumple con esta estructura." : "cumple perfectamente con esta estructura."}`;
        
        case "\\bpro\\w+\\b":
          return `El patrón "${this.pattern}" busca palabras completas que comiencen con 'pro' seguido de uno o más caracteres de palabra (letras, números o guiones bajos). "${answer}" ${!isMatch ? "no comienza con 'pro' o no es una palabra completa." : "cumple con este patrón."}`;
        
        case "^(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9]{6,8}$":
          if (!isMatch) {
            if (!/(?=.*[A-Z])/.test(answer)) {
              return `El patrón "${this.pattern}" requiere al menos una letra mayúscula. "${answer}" no contiene ninguna mayúscula.`;
            } else if (!/(?=.*[0-9])/.test(answer)) {
              return `El patrón "${this.pattern}" requiere al menos un dígito. "${answer}" no contiene ningún número.`;
            } else if (answer.length < 6 || answer.length > 8) {
              return `El patrón "${this.pattern}" requiere entre 6 y 8 caracteres. "${answer}" tiene ${answer.length} caracteres.`;
            } else if (!/^[A-Za-z0-9]+$/.test(answer)) {
              return `El patrón "${this.pattern}" solo permite letras y números. "${answer}" contiene caracteres no permitidos.`;
            }
          } else {
            return `El patrón "${this.pattern}" busca una cadena de 6-8 caracteres que contenga al menos una mayúscula y un número. "${answer}" cumple todos estos requisitos.`;
          }
  
        default:
          // Explicación genérica para patrones no específicos
          return `El patrón "${this.pattern}" ${isMatch ? "coincide" : "no coincide"} con "${answer}". ${isMatch ? "Es correcto." : "Por eso no es la respuesta correcta."}`;
      }
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
      this.questions = [
        // Nivel 1 - Patrones básicos con vocales específicas
        new Question(
          "¿Qué palabra coincide con el patrón `^c[aeiou]sa$`?",
          ["casa", "cesa", "cisa", "cosa", "cusa"],
          "casa",
          "^c[aeiou]sa$"
        ),
        // Nivel 2 - Patrones con dos posiciones variables
        new Question(
          "¿Qué palabra coincide con el patrón `^m[aeiou]r[aeiou]$`?",
          ["mara", "mera", "mira", "mora", "mura"],
          "mira",
          "^m[aeiou]r[aeiou]$"
        ),
        // Nivel 3 - Más patrones con dos posiciones variables
        new Question(
          "¿Qué palabra coincide con el patrón `^p[aeiou]t[aeiou]$`?",
          ["pata", "peta", "pita", "pota", "puta"],
          "pata",
          "^p[aeiou]t[aeiou]$"
        ),
        // Nivel 4 - Patrones con letras dobles
        new Question(
          "¿Qué palabra coincide con el patrón `^b[aeiou]ll[aeiou]$`?",
          ["balla", "belle", "billa", "bollo", "bulla"],
          "bella",
          "^b[aeiou]ll[aeiou]$"
        ),
        // Nivel 5 - Introducción a cuantificadores
        new Question(
          "¿Qué palabra coincide con el patrón `^ca+sa$`?",
          ["casa", "caasa", "caaasa", "csa", "casaa"],
          "caasa",
          "^ca+sa$"
        ),
        // Nivel 6 - Rangos de caracteres más complejos
        new Question(
          "¿Qué palabra coincide con el patrón `^[A-Z][a-z]{3}[0-9]$`?",
          ["Casa1", "A123", "Abc4", "casa5", "ABCD6"],
          "Abc4",
          "^[A-Z][a-z]{3}[0-9]$"
        ),
        // Nivel 7 - Grupos y alternativas
        new Question(
          "¿Qué palabra coincide con el patrón `^(gato|perro)s?$`?",
          ["gato", "gatos", "perro", "perros", "gatoperro"],
          "perros",
          "^(gato|perro)s?$"
        ),
        // Nivel 8 - Patrones con negación
        new Question(
          "¿Qué palabra coincide con el patrón `^[^aeiou]{3}[aeiou]r$`?",
          ["cantar", "comer", "salir", "dormir", "partir"],
          "partir",
          "^[^aeiou]{3}[aeiou]r$"
        ),
        // Nivel 9 - Límites de palabras y secuencias
        new Question(
          "¿Qué texto coincide con el patrón `\\bpro\\w+\\b`?",
          ["programa", "compra", "aprobar", "propuesta", "aprender"],
          "programa",
          "\\bpro\\w+\\b"
        ),
        // Nivel 10 - Combinación de conceptos
        new Question(
          "¿Qué texto coincide con el patrón `^(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9]{6,8}$`?",
          ["password", "Pas123", "PASSWORD", "Pass", "Pass12345"],
          "Pas123",
          "^(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9]{6,8}$"
        ),
      ];
    }
  
    start(): void {
      console.log(" ¡Bienvenido al QuizBot de Expresiones Regulares!");
      console.log(" Instrucciones: Selecciona la palabra que coincide con el patrón regex mostrado.");
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
      console.log(`📝 Patrón: ${question.pattern}`);
      question.options.forEach((opt, index) => console.log(`${index + 1}. ${opt}`));
    }
  
    answer(input: string): void {
      const question = this.questions[this.currentLevel - 1];
      const selectedOption = input.trim();
  
      if (question.isCorrect(selectedOption)) {
        console.log("¡Respuesta correcta! ✅");
        console.log(question.explainMatch(selectedOption));
        this.score++;
        console.log(` Puntuación actual: ${this.score}`);
      } else {
        console.log(" Respuesta incorrecta. ❌");
        
        // Explicar por qué la respuesta es incorrecta
        console.log("\n📌 Explicación:");
        console.log(question.explainMatch(selectedOption));
        
        // Explicar por qué la respuesta correcta sí coincide
        console.log(`\n La respuesta correcta era: "${question.correctAnswer}"`);
        console.log(question.explainMatch(question.correctAnswer));
        
        console.log(` Puntuación actual: ${this.score}`);
      }
      
      // El jugador siempre avanza al siguiente nivel, incluso si la respuesta es incorrecta
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
      
      // Mensaje según la puntuación
      if (this.score === this.maxLevel) {
        console.log(" ¡Perfecto! Eres un experto en expresiones regulares.");
      } else if (this.score >= this.maxLevel * 0.7) {
        console.log(" ¡Muy bien! Tienes un buen conocimiento de expresiones regulares.");
      } else if (this.score >= this.maxLevel * 0.5) {
        console.log(" ¡No está mal! Tienes conocimientos básicos de expresiones regulares.");
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
  
  // Usamos el bot
  const bot = new QuizBot();
  bot.start();