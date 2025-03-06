// create connection to DB
                
                $servername = "localhost";
                $username = "root";
                $password = "";
                $database = "FantaProject";// this should be the name of your DB
                
                
                //create connection like done in class
                
                $conn = new mysqli ($servername, $username, $password, $database);// i originally thought this was the name of your DB , but mysqli is a built in class that connects to your local host
                
                //check connection
                
                if ($conn->connect_error){
                    die("connection failed:".$conn->connect_error);
                }
                //echo "connected succesfully!";
                
                
                $sql = "SELECT * FROM Users";
                if($conn->query($sql) == TRUE){
                   // echo "query succseful bro";
                } else {
                    echo "query didnt work bro <br>";
                }
                
                
                $result = $conn->query($sql);
                
                $UNFound = false;
                $EMFound = false;
                
                if($result->num_rows > 0){
                    while($row = $result->fetch_assoc()){
                      
                    
                    if ($row["Username"] == $_POST ["Username"]){
                       // echo "UserName found! <br>";
                        $UNFound = true;
                    }
                    if ($row["email"] == $_POST ["email"]){
                        //echo "Email found! <br>";
                        $EMFound = true;
                    }
                }
                }else{
                    echo "nah bro nothing is in here <br>";
                }
                
                if ($UNFound && $EMFound){
                
                    echo"<script>
                    alert('Welcome Back! Loading Your DashBoard Now!');
                    window.location.href = 'DashBoard.php'; 
                        </script>";
                    
                }
                else {
                    echo "<div id='UserNotFound'>
                    <h1>user not found!</h1>
                    </div>
                    ";
                    echo " <div id='CreateUserLink'>
                     <a href = 'NewUser.php'> Create User </a>
                    </div>
                   
                    ";
                }
                
                
                
                
                $conn->close();
                ?>
