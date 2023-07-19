## TODO

- support sign-up   DONE!!!
- support pagenation 50%
- support search %95
- form validation
- handle internet connection
- add movie table
- add notes table
    - notes specfic to each user
- merge 'ADD' and 'EDIT' 
- error reporting


























let books = ref([])


async function searchBook() {
  let { data: books, error } = await supabase
  .from('books')
  .select('*')
  .eq('title', form.value.search)
  %tablename%

  books.value = books
  console.log(books, error) 
}





<form @submit.prevent="searchBook">
<div class="mb-3">
    <label for="search" class="form-label">search</label>
    <input v-model="form.search" type="text" class="form-control" id="search">
</div>
<div class="mb-3">
    <button type="submit" class="btn btn-primary">Save</button>
</div>
</form>



<h1>Search results:</h1>
<table id="dtBasicExample" class="table table-striped table-bordered table-sm" cellspacing="0" width="100%">
  <thead>
    <tr>
      <th class="th-sm">Title</th>
      <th class="th-sm">Pages</th>
      <th class="th-sm">Edit</th>
      <th class="th-sm">Delete</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="book in books">
      <td>{{ book.title }}</td>
      <td>{{ book.pages }}</td>
      <td><button type="button" class="btn btn-primary btn-sm" @click="router.push({ name: 'edit', params: { id: book.id } })">Edit</button></td>
      <td><button type="button" class="btn btn-danger btn-sm" @click="deleteBook(book.id)">Delete</button></td>
    </tr>
  </tbody>
</table>

