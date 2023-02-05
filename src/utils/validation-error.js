const AppError=require("./error-handler");
const {StatusCodes}=require("http-status-codes")
class ValidationError extends AppError{
    constructor(error){
        let errorname=error.name;
        let explanation=[];
        error.errors.forEach(element => {
            explanation.push(element.message)
        });
        super(errorname,'Not able to validate the request',explanation,StatusCodes.BAD_REQUEST)
    }
}
module.exports=ValidationError;