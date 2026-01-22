// User Model - Example model with in-memory data
class User {
    constructor(id, name, email, role) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
    }

    // Mock database - In production, this would be a real database
    static users = [
        new User(1, 'Nguyễn Văn A', 'nguyenvana@example.com', 'Admin'),
        new User(2, 'Trần Thị B', 'tranthib@example.com', 'User'),
        new User(3, 'Lê Văn C', 'levanc@example.com', 'User'),
    ];

    // Get all users
    static getAll() {
        return this.users;
    }

    // Get user by ID
    static getById(id) {
        return this.users.find(user => user.id === parseInt(id));
    }

    // Create new user
    static create(userData) {
        const newId = this.users.length > 0
            ? Math.max(...this.users.map(u => u.id)) + 1
            : 1;
        const newUser = new User(newId, userData.name, userData.email, userData.role || 'User');
        this.users.push(newUser);
        return newUser;
    }

    // Update user
    static update(id, userData) {
        const index = this.users.findIndex(user => user.id === parseInt(id));
        if (index !== -1) {
            this.users[index] = { ...this.users[index], ...userData };
            return this.users[index];
        }
        return null;
    }

    // Delete user
    static delete(id) {
        const index = this.users.findIndex(user => user.id === parseInt(id));
        if (index !== -1) {
            return this.users.splice(index, 1)[0];
        }
        return null;
    }
}

module.exports = User;
