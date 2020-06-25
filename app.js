//Book Class:Represents a book

class Book{
	constructor(title,author,isbn){
		this.title=title;
		this.author=author;
		this.isbn=isbn;

	}
}

//UI Class:Handle UI Tasks

class UI{
	static displayBooks(){
		//const storedBooks=[
		//{
		//	title:'Book One',
		//	author:'John Doe',
		//	isbn:'3434434'


		//},
		//{
		//	title:'Book Two',
		//	author:'Jane Doe',
		//	isbn:'45545'


		//}

		//];
		const books=Store.getBooks();
		books.forEach((book)=>UI.addBookToList(book));
	}


	static addBookToList(book){
		const list=document.querySelector('#book-list');
		const row=document.createElement('tr');
		row.innerHTML=`
		<td>${book.title}</td>
		<td>${book.author}</td>
		<td>${book.isbn}</td>
		<td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>`;
		list.appendChild(row);

	}

	static clearFields(){
		document.querySelector('#title').value='';
		document.querySelector('#author').value='';
		document.querySelector('#isbn').value='';

	}

	static deleteBook(el){
		if(el.classList.contains('delete')){
			el.parentElement.parentElement.remove();
		}


	}

	static showAlert(message,className){
		const div=document.createElement('div');
		div.className=`alert alert-${className}`;
		div.appendChild(document.createTextNode(message));
		const container=document.querySelector('.container');
		const form=document.querySelector('#book-form');
		container.insertBefore(div,form);

		//vanish in
		setTimeout(()=>document.querySelector('.alert').remove(),3000);

	}


}



//Store Class:Handles Storage
class Store{
	static getBooks(){
		let books;
		if(localStorage.getItem('books')===null){
			books=[];
		}else{
			books=JSON.parse(localStorage.getItem('books'));
		}
		 return books;

	}

	static addBook(book){
		const books=Store.getBooks();
		books.push(book);
		localStorage.setItem('books',JSON.stringify(books));

	}
	static removeBook(isbn){
		const books=Store.getBooks();
		books.forEach((book,index)=>{
			if(book.isbn===isbn){
				books.splice(index,1);
			}
		});
		localStorage.setItem('books', JSON.stringify(books));

	}
}



//Event:Display Books
document.addEventListener('DOMContentLoaded',UI.displayBooks);

//Event:Add a Book
document.querySelector('#book-form').addEventListener('submit',(e)=>{

//prevent actual submit
e.preventDefault();	

//Get Form Values
const title=document.querySelector('#title').value;
const author=document.querySelector('#author').value;	
const isbn=document.querySelector('#isbn').value;

//Validate
if(title===''||author===''||isbn===''){
	UI.showAlert('Please fill in all fields','danger');
}
else{

//Instatiate Book
const book=new Book(title,author,isbn);
console.log(book);

//Add Book To UI
UI.addBookToList(book);

//Add Book to Store
Store.addBook(book);

//Show Alert Message
UI.showAlert('Book Added Successfully','success');

//Clear Fields
UI.clearFields();
}
});

//Event:Remove a Book
//Remove a book from UI
document.querySelector('#book-list').addEventListener('click',(e)=>{
	UI.deleteBook(e.target);
//Remove a book from Store
Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
//Show remove message
UI.showAlert('Book Removed','warning');	

});