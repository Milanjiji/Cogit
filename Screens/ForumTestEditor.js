import React, { useEffect, useState } from "react";
import { View,Text } from "react-native";

const ForumTest = ({route}) =>{
    const {items} = route.params;
    const [count,setCount] = useState(0);
    useEffect(()=>{
        setCount(count + 1);
        console.log(items,"items from forum test",count);
    },[])
    return(
        <View>
            <Text>hello</Text>
            {items.map((i)=>{
                return(
                    <Text>{i.message} : {i.id}</Text>
                )
            })}
        </View>
    )
}
export default ForumTest;