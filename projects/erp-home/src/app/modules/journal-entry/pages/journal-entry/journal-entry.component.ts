import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-journal-entry',
  templateUrl: './journal-entry.component.html',
  styleUrl: './journal-entry.component.scss'
})
export class JournalEntryComponent {
  products!: any[];
  books:any;
  constructor() {}

  ngOnInit() {
    this.books = [ 
      { 
          name: "Clean Code", 
          author: "Robert Cecil Martin", 
          year: 2008 
      }, 
      { 
          name: "Introduction to Algorithms", 
          author: "Thomas H Corman", 
          year: 1989 
      }, 
      { 
          name: "Refactoring", 
          author: "Martin Fowler", 
          year: 1999 
      }, 
      { 
          name: "Code Complete", 
          author: "Steve McConnell", 
          year: 1993 
      }, 
      { 
          name: "Programming Pearls", 
          author: "John Bentley", 
          year: 1986 
      }, 
      { 
          name: "The Clean Coder", 
          author: "Robert Cecil Martin", 
          year: 2011 
      }, 
      { 
          name: "Coders at Work", 
          author: "Peter Seibel", 
          year: 2009 
      }, 
      { 
          name: "Effective Java", 
          author: "Joshua Bloch", 
          year: 2001 
      }, 
      { 
          name: "Head First Java", 
          author: "Bert Bates", 
          year: 2003 
      } 
  ]; 
  }
  addLine(){
    this.books.push({})
  }
  save(){
    console.log(this.books);
    
  }
}
