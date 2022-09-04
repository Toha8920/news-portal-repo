const loadCategory = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`
    const res = await fetch(url)
    const data = await res.json()
        .catch(error => { console.log(error) })
    displayCategory(data.data.news_category)
}

const displayCategory = (categories) => {
    // console.log(categories.length)
    const categoriesList = document.getElementById('category-name')

    categories.forEach(category => {
        // console.log(category.category_id)
        // console.log(category.category_name)
        const categoryList = document.createElement('div')
        categoryList.innerHTML = `
        <p onclick="loadCategoryDetails('${category.category_id}')"> ${category.category_name ? category.category_name : alert('no medssadfkjkdjsa')}</p>
        `;
        categoriesList.appendChild(categoryList);


    })
}


const loadCategoryDetails = async (category_id) => {
    spinLoader(true)
    // console.log(category_id.length)
    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`
    // console.log(url)
    const res = await fetch(url)
    const data = await res.json()
        .catch(error => console.log(error))
    displayCategoryDetails(data.data)
}

const displayCategoryDetails = async (categorys) => {
    console.log(categorys)

    const foundItems = document.getElementById('found-items')
    foundItems.innerText = categorys.length;
    if (categorys.length === 0) {
        alert('No news found')
    }

    categorys.sort((a, b) => {
        return b.total_view - a.total_view
    })



    const sectionDetails = document.getElementById('section-details');
    sectionDetails.textContent = ``
    categorys.forEach(category => {

        console.log(category)



        const sectionDiv = document.createElement('div')
        sectionDiv.classList.add('card')
        sectionDiv.classList.add('mb-3')
        sectionDiv.innerHTML = `
        <div class="row g-0 m-3">
        <div class="col-md-4">
            <img id="img-feild" src="${category.thumbnail_url}" class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-8">
            <div class="card-body">
                <h5 class="card-title">${category.title}</h5>
                <p class="card-text">${category.details.slice(0, 500)}  ......</p >
    <div class="card-text d-flex justify-content-between">
    <div class="d-flex">
    <img class="mx-3" style="height: 50px; width: 50px; border-radius: 50px;" src="${category.author.img}" alt="">
    <p class="mt-2"> ${category.author.name ? category.author.name : 'No found author'}</p>
    </div>
    <div> 
    <p> ${category.total_view ? category.total_view : 'No view'}</p>
    </div>
    <div>
    <button onclick="loadModalDetails('${category._id}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop"
    >Details</button>
    </div>
    </div>
    `;
        sectionDetails.appendChild(sectionDiv);

    });


    spinLoader(false)
}


const loadModalDetails = async (_id) => {
    const url = `https://openapi.programming-hero.com/api/news/${_id}`
    const res = await fetch(url)
    const data = await res.json()
        .catch(error => console.log(error))
    displayModalDetails(data.data[0])
}

const displayModalDetails = (id) => {
    console.log(id)
    const modalTitle = document.getElementById('modal-title')
    modalTitle.innerText = id.title;
    const modalBody = document.getElementById('modal-body')
    modalBody.innerHTML = `
    <p>Total View:${id.total_view ? id.total_view : "No found message"}</p>
    <p>Author Name:${id.author.name ? id.author.name : "No found Author"}</p>
    <p>Published Date:${id.author.published_date ? id.author.published_date : "No found message"}</p>
    <p>Is today Pick:${id.others_info.is_todays_pick}</p>
    <p>Ratting Badge:${id.rating.badge}</p>
    <p>Author Picture =>  <img src="${id.author.img}"style="height: 150px; width: 150px; border-radius: 15px;"></p>
   
    <p>News Thumbnail => <img src="${id.thumbnail_url}"style="height: 300px; width: 300px; border-radius: 10px;"></p>
    
    <p>Full details:${id.details}</p>
    `
}

document.getElementById('bolg-section').addEventListener('click', function () {
    const showBlog = document.getElementById('show-blog')
    showBlog.innerHTML = `
   <h5><strong class="text-success">1. The distinguis of var let const is : </strong>  Var variables can be updated and re-declared within its scope; let variables can be updated but not re-declared; const variables can neither be updated nor re-declared. </h5>


   <h5 class="mt-4"><strong class="text-success">2. Defference between regular and arrow function : </strong>Regular functions created using function declarations or expressions are constructible and callable. Since regular functions are constructible, they can be called using the new keyword. However, the arrow functions are only callable and not constructible, i.e arrow functions can never be used as constructor functions. </h5>

   <h5  class="mt-4"><strong class="text-success">3. Advantage of using template string : </strong> A template is a sample document that has some pre defined format which contain image or text that may be changed and used by the user easily. It helps you save money and time. Templates promote client satisfaction and clarity. It boosts productivity. </h5>
   `
})

const spinLoader = (isLoading) => {
    const spinLoader = document.getElementById('loader')
    if (isLoading === true) {
        spinLoader.classList.remove('d-none')
    }
    else {
        spinLoader.classList.add('d-none')
    }
}


loadCategoryDetails('08')
loadCategory()