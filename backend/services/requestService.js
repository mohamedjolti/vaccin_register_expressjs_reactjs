/**
 * 
 * @param {*} res 
 * @param {{
 * message:string | null,
 * status :boolean
 * }} data 
 */
export const sendResult=(res,data)=>{
  res.send(data);
}