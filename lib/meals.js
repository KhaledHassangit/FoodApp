import sql from "better-sqlite3"
import slugify from "slugify";
import xss from "xss";
import fs from "node:fs"
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

export async function CreateMeal(meal){

    meal.slug = slugify(meal.title,{lower:true});
    meal.instructions = xss(meal.instructions);

    const extension = meal.image.name.split(".").pop()
    const fileName = `${meal.slug}.${extension}`

    const stream = fs.createWriteStream(`public/images/${fileName}`)
    const bufferedImage = await meal.image.arrayBuffer()

    stream.write(Buffer.from(bufferedImage), (error) => {
        if(error){
            throw new Error ("Saving image failed!")
        }
    })
    meal.image = `/images/${fileName}`
    db.prepare(`
        INSERT INTO meals (title,summary,instructions,creator,creator_email,image,slug)
        VALUES (
            @title,
            @summary,
            @instructions,
            @creator,
            @creator_email,
            @image,
            @slug,
            )
        `).run(meal)
}