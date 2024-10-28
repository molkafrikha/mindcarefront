import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [FormsModule ,CommonModule],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.scss'
})
export class ChatbotComponent {
  userMessage: string = '';
  chatHistory: { sender: string; message: string }[] = [];

  constructor(private http: HttpClient) {}

  sendMessage() {
    if (this.userMessage.trim()) {
      this.chatHistory.push({ sender: 'User', message: this.userMessage });

      // Envoyer le message à votre API Django
      this.http.post('http://localhost:8000/api/classify_symptoms', { message: this.userMessage })
        .subscribe((response: any) => {
          const botResponse = `Symptom: ${response.predicted_class}, Confidence: ${response.confidence}`;
          this.chatHistory.push({ sender: 'Bot', message: botResponse });
        }, error => {
          this.chatHistory.push({ sender: 'Bot', message: 'Sorry, I could not process your request.' });
        });

      // Réinitialiser le message de l'utilisateur
      this.userMessage = '';
    }
  }
}
