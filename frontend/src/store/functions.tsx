

export const LoginTry=async(data)=>{
    try{
        const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        body: JSON.stringify(data),
        // headers: { "Content-Type": "application/json" },
        // credentials: "include",
        mode: "cors",
      });
      if(response.status == 200)
        return await response.json(); 
      if(response.status == 401)
        return {message:"fail"};
    }
    catch(e){
        return {message: "something went wrong"}
    }
};
      
