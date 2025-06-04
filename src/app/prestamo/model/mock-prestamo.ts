import { Author } from '../../author/model/Author';
import { Category } from '../../category/model/Category';
import { PrestamoPage } from '../model/PrestamoPage';

export const PRESTAMO_DATA:PrestamoPage = {
    content: [
        { id: 1, fecha_prestamo:'2025-06-06', fecha_devolucion:'2026-06-20', client: {id:1, name:'Jon Base'}, game:{
            id: 1, title: 'Flying to the sky', age: 10,
            category: new Category,
            author: new Author
        }}, 
        { id: 3, fecha_prestamo:'2025-04-04', fecha_devolucion:'2026-06-18', client: {id:2, name:'Nuria Sol'}, game:{
            id: 2, title: 'Risky', age: 12,
            category: new Category,
            author: new Author
        }}, 
        { id: 4, fecha_prestamo:'2025-03-03', fecha_devolucion:'2026-03-17', client: {id:3, name:'Sandra Boon'}, game:{
            id: 3, title: 'Summer Game', age: 13,
            category: new Category,
            author: new Author
        }}, 
        { id: 5, fecha_prestamo:'2025-03-02', fecha_devolucion:'2026-03-16', client: {id:4, name:'Alvaro Gonzalez'}, game:{
            id: 4, title: 'Fight Club', age: 10,
            category: new Category,
            author: new Author
        }}, 
        { id: 6, fecha_prestamo:'2025-05-01', fecha_devolucion:'2026-05-15', client: {id:5, name:'Peter Long'}, game:{
            id: 5, title: 'Black King', age: 10,
            category: new Category,
            author: new Author
        }}, 
        
    ],
    pageable: {
        pageSize: 5,
        pageNumber: 0,
        sort: [{ property: 'id', direction: 'ASC' }],
    },
    totalElements: 6,
};

