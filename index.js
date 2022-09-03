const loadCategory = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`
    const res = await fetch(url)
    const data = await res.json()
        .catch(error => { console.log(error) })
    displayCategory(data.data.news_category)
}

const displayCategory = async (categories) => {
    // console.log(categories)
    const categoriesList = document.getElementById('category-name')

    categories.forEach(category => {
        // console.log(category.category_id)
        // console.log(category.category_name)
        const categoryList = document.createElement('div')
        categoryList.innerHTML = `
        <p onclick="loadCategoryDetails('${category.category_id}')"> ${category.category_name}</p>
        `;
        categoriesList.appendChild(categoryList)

    })
}


const loadCategoryDetails = async (category_id) => {
    // console.log(category_id)
    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`
    // console.log(url)
    const res = await fetch(url)
    const data = await res.json()
    displayCategoryDetails(data.data)
}

const displayCategoryDetails = async (categorys) => {
    // console.log(categorys)
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
                <p class="card-text">${category.details.slice(0, 500)}
    }</p >
    <div class="card-text d-flex justify-content-between">
    <div class="d-flex">
    <img class="mx-3" style="height: 50px; width: 50px; border-radius: 50px;" src="${category.author.img}" alt="">
    <p class="mt-2"> ${category.author.name}</p>
    </div>
    <div> 
    <p> ${category.total_view}</p>
    </div>
    <div>
    <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Details</button>
    </div>
    </div>
    `;
        sectionDetails.appendChild(sectionDiv)
    })

}

loadCategory()