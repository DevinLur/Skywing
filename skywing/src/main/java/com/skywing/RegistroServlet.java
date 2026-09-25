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

@WebServlet("/registro")
public class RegistroServlet extends HttpServlet {

    private Map<String, String> usuarios = new HashMap<>();

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

        if (!email.contains("@") || !email.contains(".")) {
            out.print("{\"exito\":false,\"mensaje\":\"El correo no es valido\"}");
            return;
        }

        if (password.length() < 4) {
            out.print("{\"exito\":false,\"mensaje\":\"La contrasena debe tener al menos 4 caracteres\"}");
            return;
        }

        if (usuarios.containsKey(email)) {
            out.print("{\"exito\":false,\"mensaje\":\"Ese correo ya esta registrado\"}");
            return;
        }

        usuarios.put(email, password);
        out.print("{\"exito\":true,\"mensaje\":\"Cuenta creada correctamente\"}");
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        response.getWriter().println("<h1>RegistroServlet activo</h1>");
        response.getWriter().println("<p>Usa POST para registrar un usuario.</p>");
    }
}