// Mock de autenticación mientras el backend no esté listo.
// TODO: reemplazar por `fetch(`${API_BASE_URL}/auth/login`, { method: 'POST', ... })`
// cuando exista el endpoint real. La forma de la respuesta ({ token, user })
// ya coincide con lo que se espera del backend.

const MOCK_USERS = [
	{
		email: 'admin@sena.edu.co',
		password: 'demo1234',
		name: 'María Fernanda Ríos',
		role: 'Coordinadora académica'
	}
];

function base64url(value) {
	return btoa(JSON.stringify(value)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function buildMockToken(user) {
	const header = { alg: 'none', typ: 'JWT' };
	const payload = {
		sub: user.email,
		role: user.role,
		exp: Math.floor(Date.now() / 1000) + 60 * 60 * 4 // 4 horas
	};
	return `${base64url(header)}.${base64url(payload)}.mock-signature`;
}

export async function login(email, password) {
	await new Promise((resolve) => setTimeout(resolve, 700));

	const match = MOCK_USERS.find((candidate) => candidate.email === email && candidate.password === password);
	if (!match) {
		throw new Error('Correo o contraseña incorrectos.');
	}

	const { password: _password, ...user } = match;
	return { token: buildMockToken(user), user };
}
