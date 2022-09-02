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
    const sectionDetails = document.getElementById('section-details')
    categorys.forEach(category => {
        console.log(category)
    })

}

loadCategory()