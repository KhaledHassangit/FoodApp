import sql from "better-sqlite3"

const db = sql("meals.db");

export   async function getMeals(){
    await new Promise((resolv) => setTimeout(resolv,2000))
    // all fetch  / run insert / for single row
    // throw new Error ("Loading Failed")
    return db.prepare("SELECT * FROM meals").all()
}

export  function getMealsDetails(slug){
    return db.prepare("SELECT * FROM meals WHERE slug =?").get(slug)
}