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
    console.log(url)
    const res = await fetch(url)
    const data = await res.json()
    displayCategoryDetails(data.data)
}

const displayCategoryDetails = async (categorys) => {
    console.log(categorys)
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
                <h5 class="card-title">Card title</h5>
                <p class="card-text">This is a wider card with supporting text below as a natural
                    lead-in to additional content. This content is a little bit longer.</p>
                <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
            </div>
        </div>
    </div>
       `;
        sectionDetails.appendChild(sectionDiv)
    })

}

loadCategory()