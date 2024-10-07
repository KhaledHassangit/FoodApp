"use server";

import { redirect } from "next/navigation";
import { CreateMeal } from "./meals";



function inInvaildText(text){
    return !text || text.trim() === "" ;
}

export async function shareMeal(prevState,formData){
    const meal = {
        // name assigned to the input 
        title:formData.get("title"),
        summary:formData.get("summary"),
        instructions:formData.get("instructions"),
        image:formData.get("image"),
        creator:formData.get("name"),
        creator_email:formData.get("email"),
    }
    if (inInvaildText(meal.title) || 
        inInvaildText(meal.summary) || 
        inInvaildText(meal.instructions) || 
        inInvaildText(meal.creator) || 
        inInvaildText(meal.creator_email) ||
        !meal.creator_email.include("@") ||
        !meal.image || meal.image.size === 0) 
        {
            return {
                message :"Invaild Input"
            }
            // throw new Error("Please fill in all required fields.");
    }

    await CreateMeal(meal)
    redirect("/meals")
}
