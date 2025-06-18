import { create } from "@/app/actions/create";
import { Detail } from "../types/types";

export async function createDetails(data: Omit<Detail, 'id' | 'event_id'>, idEvent: string) { // Use Omit for data type
    const completData = {
        // id: "", //  Let the database generate the id
        event_id: idEvent, //  This is the event ID for the relation
        description: data.description,
        requirements: data.requirements,
        status_detail: data.status_detail,
        theme: data.theme
    };

    console.log("Data to be created in 'details' table: ", completData);

    try {
        const createdDetail = await create(completData, "details"); // Call the 'create' action and await the result

        if (createdDetail) {
            console.log("Detail created successfully. Created Detail:", createdDetail);
            return {
                success: true,
                data: createdDetail // Return the created detail object, including the ID
            };
        } else {
            console.error("Failed to create detail (create action returned null).");
            return {
                success: false,
                data: null // Indicate failure and return null data
            };
        }
    } catch (error) {
        console.error("Error during detail creation:", error);
        return {
            success: false,
            data: null // Indicate failure due to error and return null data
        };
    }
}