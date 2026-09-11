// Mock de autenticación mientras el backend no esté listo.
// Acepta credenciales de prueba con tolerancia de mayúsculas/espacios
// y contraseñas comunes de desarrollo para facilitar las pruebas.

const MOCK_USERS = [
	{
		email: 'admin@sena.edu.co',
		passwords: ['demo1234', 'admin123', 'password123', 'admin', '123456', 'cset2026'],
		name: 'María Fernanda Ríos',
		role: 'Coordinadora académica'
	},
	{
		email: 'coordinador@sena.edu.co',
		passwords: ['demo1234', 'admin123', 'password123', '123456'],
		name: 'Carlos Alberto Gómez',
		role: 'Coordinador de formación'
	},
	{
		email: 'instructor@sena.edu.co',
		passwords: ['demo1234', 'admin123', 'password123', '123456'],
		name: 'Laura Sofía Castro',
		role: 'Instructora vocera'
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
	await new Promise((resolve) => setTimeout(resolve, 400));

	const cleanEmail = (email || '').trim().toLowerCase();
	const cleanPass = (password || '').trim();

	// Buscar usuario mock
	let match = MOCK_USERS.find((candidate) => {
		const emailMatch = candidate.email.toLowerCase() === cleanEmail;
		const passMatch =
			candidate.passwords.includes(cleanPass) ||
			candidate.passwords.includes(cleanPass.toLowerCase()) ||
			cleanPass === 'demo1234' ||
			cleanPass === 'admin' ||
			cleanPass === 'admin123';
		return emailMatch && passMatch;
	});

	// Si no coincide exactamente pero el correo es del SENA o es admin, permitir acceso dev
	if (!match && cleanEmail.includes('sena.edu.co')) {
		match = {
			email: cleanEmail,
			passwords: [cleanPass],
			name: 'Usuario SENA CSET',
			role: 'Comité de Evaluación'
		};
	}

	// Si el usuario puso admin / admin123 con cualquier correo sena
	if (!match && (cleanEmail === 'admin' || cleanEmail.startsWith('admin@'))) {
		match = MOCK_USERS[0];
	}

	if (!match) {
		throw new Error('Correo o contraseña incorrectos. Usa admin@sena.edu.co / demo1234');
	}

	const { passwords: _passwords, ...user } = match;
	return { token: buildMockToken(user), user };
}
