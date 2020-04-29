exports.createNewUser = (user)=> {
    console.log("saving...");
    console.log(`user ${user} created`);
};

exports.fetchImageMetaData = (id)=> {
    metadata ={
        id: id,
        title: "Sunset by the beach",
        description: "Taken in Mexico - may be useful in an advertisement",
        creator: "Gerrad A. Peter",
        date: "2020-01-07T01:30:38.608Z"
    }
    return metadata
}



// module.exports = createNewUser