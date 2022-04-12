const bcrypt=require("bcryptjs")


  /**
   * hash a string
   * @param {string} str 
   * @returns {string}
   */
const hashString=async (str)=>{
    const salt=await bcrypt.genSalt(10);
    const hash=await bcrypt.hash(str,salt);
    return hash;
}
  
/**
 * check if two hasched strings matches
 * @param {string} str1 
 * @param {string} str2 
 * @returns {boolean}
 */
const compareTwoHashedStrings=async (str1,str2)=>{
    return await bcrypt.compare(str1,str2);
}
module.exports={hashString,compareTwoHashedStrings}