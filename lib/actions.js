'use server'


export async function addBook(data) {
    console.log('Adding book:', data);

    return { message: 'Книга успішно додана!' };
}