import { getModelForClass, modelOptions, Severity, prop} from "@typegoose/typegoose";

@modelOptions({
    schemaOptions:
    {
        timestamps:true
    },
    options:
    {
        allowMixed:Severity.ALLOW
    }
})

export class Room {
    @prop({ required: true})
        title: string;
  
    @prop({ required: false, default:"" })
        body?: string;
  
    @prop({ required: false, default:"" })
        input?: string;
  
    @prop({ required: true })
        language?: string;
}
  

const RoomDataModel=getModelForClass(Room);

export default RoomDataModel ;
