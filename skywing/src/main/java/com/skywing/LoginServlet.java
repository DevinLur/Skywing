package com.skywing;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;

@WebServlet("/login")
public class LoginServlet extends HttpServlet {

    private Map<String, String> usuarios = new HashMap<>();

    @Overrides
    public void init() throws ServletException {
        usuarios.put("admin@skywing.com", "1234");
        usuarios.put("angel@universidad.edu.co", "5678");
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        String email = request.getParameter("email");
        String password = request.getParameter("password");

        response.setContentType("application/json;charset=UTF-8");
        PrintWriter out = response.getWriter();

        if (email == null || email.trim().isEmpty() ||
            password == null || password.trim().isEmpty()) {
            out.print("{\"exito\":false,\"mensaje\":\"Debes completar todos los campos\"}");
            return;
        }

        if (password.length() < 4) {
            out.print("{\"exito\":false,\"mensaje\":\"La contrasena debe tener al menos 4 caracteres\"}");
            return;
        }

        if (usuarios.containsKey(email) && usuarios.get(email).equals(password)) {
            out.print("{\"exito\":true,\"mensaje\":\"Bienvenido " + email + "\",\"email\":\"" + email + "\"}");
        } else {
            out.print("{\"exito\":false,\"mensaje\":\"Correo o contrasena incorrectos\"}");
        }
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        response.getWriter().println("<h1>LoginServlet activo</h1>");
        response.getWriter().println("<p>Usa POST para iniciar sesion.</p>");
    }
}