import { Component } from '@angular/core';
import { ClipboardService } from 'ngx-clipboard' 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private clipboardService: ClipboardService){
  
    }
  btnText = "Copy"
  length = 0;
  includeLetters = false;
  includeUpLetters = false;
  includeNumbers = false;
  includeSymbols = false;
  includeAll = false;
  password = '';

  onChangeLength(value: string) {
    const parsedValue = parseInt(value);

    if (!isNaN(parsedValue)) {
      this.length = parsedValue;
    }

  }

  onChangeUseLetters() {
    this.includeLetters = !this.includeLetters;

  }
  onChangeUseUpLetters() {
    this.includeUpLetters = !this.includeUpLetters;

  }
  onChangeUseNumbers() {
    this.includeNumbers = !this.includeNumbers;

  }
  onChangeUseSymbols() {
    this.includeSymbols = !this.includeSymbols;

  }
  onChangeUseAll() {
    this.includeAll = !this.includeAll
    if (this.includeAll) {
      this.includeLetters = true;
      this.includeUpLetters = true;
      this.includeNumbers = true;
      this.includeSymbols = true;
    } else {
      this.includeLetters = false;
      this.includeUpLetters = false;
      this.includeNumbers = false;
      this.includeSymbols = false;
    }
  }

  onButtonClick() {
    const numbers = '1234567890';
    const letters = 'abcdefghijklmnopqrstuvwyz';
    const upLetters = letters.toUpperCase();
    const symbols = '!@$%^&*()-_.,'

    let validChars = '';
    if (this.includeLetters) {
      validChars += letters;
    }
    if (this.includeUpLetters) {
      validChars += upLetters;
    }
    if (this.includeNumbers) {
      validChars += numbers;
    }
    if (this.includeSymbols) {
      validChars += symbols;
    }

    let generatedPassWord = '';
    while ((![...numbers].some(r => [...generatedPassWord].includes(r)) && this.includeNumbers)
      || (![...letters].some(r => [...generatedPassWord].includes(r)) && this.includeLetters)
      || (![...upLetters].some(r => [...generatedPassWord].includes(r)) && this.includeUpLetters)
      || (![...symbols].some(r => [...generatedPassWord].includes(r)) && this.includeSymbols)) {
      generatedPassWord = '';
      for (let i = 0; i < this.length; i++) {
        const index = Math.floor(Math.random() * validChars.length);
        generatedPassWord += validChars[index];
      }
    }

    this.password = generatedPassWord;

  }
  copyContent() {
    this.clipboardService.copyFromContent(this.password)
    this.btnText = "Copied"
    setTimeout(() => {
      this.btnText = "Copy"
    },1000)
  }

}

