import zod from "zod";
const a=zod.object({username:zod.string(),firstName:zod.string(),lastName:zod.string(),password:zod.string()});
const b=zod.object({username:zod.string(),password:zod.string()});
export {a,b};