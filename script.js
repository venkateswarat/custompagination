let data =[];
let totalItems =100;
let pageSize=10;
for(let i=1;i<=totalItems; i++){
    data.push(i);
}

let ascending=true; // Pending
let currentPage=1;
let enablePrv=false;
let enableNxt=false;
let filteredRows=[];




// console.log(data);
let tempData = chunk(data,pageSize);
console.log('Total number of Records:', data.length);
let totalNumberOfPages=0;
// console.table(tempData);
let currentPagestr='';
let count=1;
let labelName='';
let datamap = {};
for(let sample of tempData){
    totalNumberOfPages++;
    if(totalItems<=pageSize){
        labelName=(count+' - '+totalItems+' / '+data.length);
        datamap[count]={
            labelName,
            data:sample
        }
    }else {
        if(count==1){
            labelName=(1+' - '+(sample.length) +' / '+data.length);
            datamap[count]={
                labelName,
                data:sample
            }
            count++;
            continue;
        }else{
            // if(count==2)
            if(sample.length==pageSize){
                labelName=(((count-1)*pageSize+1)+' - '+(pageSize*count) +' / '+data.length);
                // console.log('Label Name:', labelName)
            }else{
                labelName=(((count-1)*pageSize+1)+' - '+(totalItems) +' / '+data.length);
                // labelName=((pageSize+ 1)+' - '+totalItems+' / '+data.length);
                // console.log('Label Name:', labelName)
            }
            datamap[count]={
                labelName,
                data:sample
            }
            count++;
        }
    }
}

enableNxt=currentPage<totalNumberOfPages;

function next(){
    if(currentPage<totalNumberOfPages){
        currentPage++;
    }else{
        console.log('You are in last page')
    }
    enableNxt=currentPage<totalNumberOfPages;
    enablePrv=currentPage>1;
    displayData();
}

function prv(){
    if(currentPage>1){
        currentPage--;
    }
    enableNxt=currentPage<totalNumberOfPages;
    enablePrv=currentPage>1;
    displayData();
}

function displayData(){
    console.log('totalNumberOfPages:',totalNumberOfPages);
    console.log('currentPage',currentPage)
    console.log('enablePrv',enablePrv);
    console.log('enableNxt',enableNxt);
    if(totalNumberOfPages!=0){
        console.log('labelName',datamap[currentPage].labelName);
        filteredRows=datamap[currentPage].data;
        filteredRows=sortingData(filteredRows);
        console.log('filteredRows',filteredRows)
    }else{
        filteredRows=[];
        console.log('labelName','');
        console.log('filteredRows',filteredRows)
    }
    // 
    console.log('------------------')
}
displayData();

function sortingData(data){
    if(ascending){
        data.sort(function(a, b){return a - b});
    }else{
        data.sort(function(a, b){return b - a});
    }
    return data
}
function sort(){
    ascending=!ascending;
    console.log(sortingData(filteredRows));
}
next();
next();

prv();
prv();
prv();
prv();


/*

//totalItems=0;
//pageSize=50;
// enablePrv=false;
// enableNxt=false;
//labelName='';
//currentPage=1;
// startIndex=0;
// endIndex=0;
filteredRows=[]
ascending=true;

*/

























function chunk (items, size) {
    const chunks = []
    items = [].concat(...items)
    while (items.length) {
      chunks.push(
        items.splice(0, size)
      )
    }
    return chunks
}