let a;

a = [5, 3, 5, 7];
for (let i = 0; i < a.length; i++) {
    console.log(a[i])
}

a = [15, 13, 5, 17];
for (let x of a) {
    console.log(x)
}

a = [15, 13, 5, 17];
for (i in a)            // keine garantierte Reihenfolge
    console.log(a[i]);


a = [15, 13, 5, 17];
a.forEach(function (element, index, array) {
    console.log(element);
    //print(index);
    //print(array);
});


