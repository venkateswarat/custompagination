let data =[];
let totalItems =100;
let pageSize=10;
let ascending=true;
let currentPage=1;
let enablePrv=false;
let enableNxt=false;
let filteredRows=[];
let totalNumberOfPages=0;
let currentPagestr='';
let count=1;
let labelName='';
let datamap = {};
let tempData = [];
for(let i=1;i<=totalItems; i++){
    data.push(i);
}
sortingData(data);
tempData = chunk(data,pageSize);

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
            if(sample.length==pageSize){
                labelName=(((count-1)*pageSize+1)+' - '+(pageSize*count) +' / '+data.length);
            }else{
                labelName=(((count-1)*pageSize+1)+' - '+(totalItems) +' / '+data.length);
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
    if(totalNumberOfPages!=0){
        filteredRows=datamap[currentPage].data;
        filteredRows=sortingData(filteredRows);
    }else{
        filteredRows=[];
    }
}

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
    sortingData(filteredRows);
}

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