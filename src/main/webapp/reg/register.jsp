<%@page import="java.sql.*" %>

<%
   String email = request.getParameter("email");
   String psw = request.getParameter("psw");
   String psw_repeat = request.getParameter("psw_repeat");

 try{
     Class.forName("com.mysql.jdbc.Driver");
     Connection con= DriverManager.getConnection("jdbc:mysql://localhost:3306/project","root","password@123");
     Statement stm = con.createStatement();
     stm.executeUpdate("insert into registereduser (email , psw, psw_repeat) values('"+email+"', '"+psw+"' , '"+psw_repeat+"')");
     response.sendRedirect("success.html");
     
   }
 catch(Exception e){
   // out.println(e);
	response.sendRedirect("error.html");
 }
 
 
 %>  
 