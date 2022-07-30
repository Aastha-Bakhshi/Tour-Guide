<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
<%@ page import ="java.sql.*" %>
<%

         String email = request.getParameter("email");   
         String psw = request.getParameter("psw");
    try{

        Class.forName("com.mysql.jdbc.Driver");  // MySQL database connection
        Connection con= DriverManager.getConnection("jdbc:mysql://localhost:3306/project","root","password@123");
        PreparedStatement pst = con.prepareStatement("Select email,psw from registereduser where email=? and psw=?");
        pst.setString(1, email);
        pst.setString(2, psw);
        ResultSet rs = pst.executeQuery();                        
        if(rs.next())           
        	response.sendRedirect("Map.html");       
        else
        	response.sendRedirect("Error.html");   
               
   }

   catch(Exception e){       
       out.println("Something went wrong !! Please try again");       
   }      
%>