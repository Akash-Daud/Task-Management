import { Admin } from "../model/admin.model.js";
import bcrypt from "bcrypt";                 // this is the password bcrypt library for hashung the password
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import { Team } from "../model/team.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Employee } from "../model/employee.model.js";
import { Client } from "../model/client.model.js";

    // _id is using the mongoose _id property
const createAccessAndRefreshToken = async (_id) => {

    const admin = await Admin.findById(_id)

     // this token is used for the Access Token

    const adminAccessToken = admin.generateAdminAccessToken();
    const adminRefreshToken = admin.generateAdminRefreshToken();

    admin.adminRefreshToken = adminRefreshToken;

    await admin.save({validateBeforeSave: false});


     // return the response  for frontend 
    return {
        adminAccessToken,
        adminRefreshToken
    } 


}


const options = {

    httpOnly: true,
    secure: true,

}


const registerAdmin = async (req, res) => {

    try {
        // accept the data from postman

        const {adminName, adminEmail, adminPassword} = req.body;

        // validate the data

        if(!adminName || !adminEmail || !adminPassword) {
            throw new ApiError(400, "Please provide all the required fields");
        }


        // check if the admin already exists

        const existedAdmin = await Admin.findOne({ adminEmail })

        if(existedAdmin) {
            throw new ApiError(400, "Admin already exists");
        }

        // create a entry in the database 

        const admin = await Admin.create({
            adminName,
            adminEmail,
            adminPassword
        })

        admin.save({validateBeforeSave: false});


        // return the response  for frontend

        return res.status(200).json(
            new ApiResponse(200, "Admin created successfully", admin)
        )
        
    } 
    catch (error) {
        console.log(" Error => ", error.message)
        throw new ApiError(400, error.message);
    }
}
 

const loginAdmin = asyncHandler(async (req, res) => {

    try {
        // accept the data from frontend

        const {adminEmail, adminPassword} = req.body;

        console.log("req.body => ", req.body)
        
        // validate the data

        if(!adminEmail || !adminPassword) {
            throw new ApiError(400, "Please provide all the required fields");
        }

        // find the entry in the database

        const admin = await Admin.findOne({ adminEmail })

        if(!admin) {
            throw new ApiError(400, "Admin does not exist");
        }

        // check if the password is correct

        const isPasswordCorrect = await bcrypt.compare(adminPassword, admin.adminPassword);

        if(!isPasswordCorrect) {
            throw new ApiError(400, "Invalid password");
        }

        // generate the access and refresh tokem

        const {adminAccessToken, adminRefreshToken} = await createAccessAndRefreshToken(admin._id);

        
        // return the response 

        return res
        .status(200)
        .cookie("adminAccessToken", adminAccessToken, options)
        .cookie("adminRefreshToken", adminRefreshToken, options)
        .json(
            new ApiResponse(200, "Admin logged in successfully", admin)
        )


    } 
    catch (error) {
        console.log(" Error => ", error.message)
        throw new ApiError(400, error.message);
    }
})


const getTotalEmployees = async(req, res) => {


    const {adminEmail} = req.user;  // 

    if(!adminEmail) {   // validation 
        throw new ApiError(400, "Please provide the admin email");
    }

    try {
        // accept the data from frontend  that this we are using the try catch block

        const employeeList = await Employee.find({adminEmail});
        
        return res
            .status(200)
            .json(
                new ApiResponse(200, "Total employees", employeeList.length)
            )
        
    } 
    catch (error) {
        console.log(" Error => ", error.message)
        throw new ApiError(400, error.message);
    }
}


const getTotalEmployeeDetails = async (req, res) => {

    const {adminEmail} = req.user;
    
    if(!adminEmail) {
        throw new ApiError(400, "Please provide the admin email");
    }
    
    try {
        // accept the data from frontend  that this we are using the try catch block
        
        const employeeList = await Employee.find({adminEmail});
        
        return res
            .status(200)
            .json(
                new ApiResponse(200, "Total employee details", employeeList)
            )
        
    } 
    catch (error) {
        console.log(" Error => ", error.message)
        throw new ApiError(400, error.message);
    }

}


const getAllClients = async(req, res) => {

    const {adminEmail} = req.user;
    
    if(!adminEmail) {
        throw new ApiError(400, "Please provide the admin email");
    }
    
    try {
        // accept the data from frontend  that this we are using the try catch block
        
        const clientList = await Client.find({adminEmail});
        
        return res
            .status(200)
            .json(
                new ApiResponse(200, "client list fetched successfully", clientList)
            )
        
    } 
    catch (error) {
        console.log(" Error => ", error.message)
        throw new ApiError(400, error.message);
    }
}


const createTeams = asyncHandler(async (req, res) => {

    try {

        // accept the data from the body 

        console.log("req.body => ", req.body)

        const {teamName, teamLead, projectId, employeeEmail, teamId} = req.body;

        // validate the data
        
        if(!teamName || !teamLead || !projectId || !employeeEmail) {
            throw new ApiError(400, "Please provide all the required fields");
        }

        // check if the team already exists
        
        const existedTeam = await Team.findOne({ teamName })
        
        if(existedTeam) {
            throw new ApiError(400, "Team already exists");
        }

        // create a entry in the database 
        
        const team = await Team.create({
            teamName,
            teamLead,
            projectId,
            employeeEmail,
            teamId
        })

        team.save({validateBeforeSave: false});

        return res  
            .status(200)
            .json(
                new ApiResponse(200, "Team created successfully", team)
            )

        
    } 
    catch (error) {
        console.log(" Error => ", error.message)
        throw new ApiError(400, error.message);
    }

})

const getAllTeams = async(req, res) => {

    try {

        const team = await Team.find({});

        return res
        .status(200)
        .json(
            new ApiResponse(200, "Total teams fetched successfully", team)
        )
        
    } 
    catch (error) {
        console.log(" Error => ", error.message)
        throw new ApiError(400, error.message);
    }
}


export {
    registerAdmin,
    loginAdmin,
    getTotalEmployeeDetails,
    getAllClients,
    getAllTeams,
    createTeams
    
}