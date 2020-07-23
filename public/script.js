console.log("Голый скрипт заработал");

var tableApp = angular.module('tableApp', []);

tableApp.controller('tableAppController', function($scope, $http){

    $http({method: 'GET', url: 'user.json'}).
        then(function success(response) {
        $scope.userData = response.data;
        });

    $http({method: 'GET', url: 'report1.json'}).
        then(function success(response) {
            $scope.tableData = response.data;
            console.log($scope.tableData);

            $scope.tableData.data.header.sort(function(a, b){
                if(a.key < b.key) return -1;
                if(a.key > b.key) return 1;
            });

            $scope.tableData.data.header = $scope.tableData.data.header.filter(function(el){
                return !["account", "doc_a", "doc_p", "house"].includes(el.key)
            })

            $scope.tableData.data.body.forEach(function(item){
                delete item.account;
                delete item.doc_a;
                delete item.doc_p;
                delete item.house;
            })

            // var indexes = [];
            // $scope.tabledata.data.header.forEach(function(el){
            //     indexes.push(el)
            // })

            $scope.footer = []
            $scope.tableData.data.footer.forEach(function(item){
                if (Array.isArray(item.value_a)){
                    item.value_a = item.value_a.join('');
                }
                if (Array.isArray(item.value_p)){
                    item.value_p = item.value_p.join('');
                }
                $scope.footer[6] = item.saldo_in;
                $scope.footer[7] = item.saldo_out;
                $scope.footer[9] = item.value_a;
                $scope.footer[10] = item.value_p;
            })
            
            //$scope.correctedData = $scope.tableData.data.body;
            // $scope.tableData.data.body = $scope.tableData.data.body.map(function(item){
            $scope.tableData.data.body.map(function(item){
                for (var key in item){
                    switch (typeof(item[key])) {
                        case 'boolean':
                            if (item[key] === true){
                                item[key] = "Да";
                            }else{
                                item[key] = "Нет";
                            };
                            break;
                        case 'object':
                            if (Array.isArray(item[key])){
                                item[key] = item[key].join('');
                                if (item[key] === ""){
                                    item[key] = "Нет данных";
                                };
                            }
                        default:
                            break;
                    }
                }
            })
        });
})
