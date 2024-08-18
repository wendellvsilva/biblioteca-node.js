import request from 'supertest';
import app from '../../src/app.js';
import Livro from '../../src/models/Livro.js';

jest.mock('../../src/models/Livro.js');

describe('LivroController', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    beforeEach(async () => {
        await Livro.create({
            id: 1,
            titulo: 'Livro Teste',
            autor: 'Autor Teste',
            paginas: 100
        });
    });
    

    describe('GET /livros', () => {
        it('deve listar todos os livros', async () => {
            const livros = [{ id: 1, titulo: 'Livro Teste' }];
            Livro.findAll.mockResolvedValue(livros);
    
            const res = await request(app).get('/livros');
    
            expect(res.statusCode).toEqual(200);
            expect(res.body).toEqual(livros);
            expect(Livro.findAll).toHaveBeenCalledTimes(1);
        });
    
        it('deve retornar erro 500 se falhar ao listar livros', async () => {
            Livro.findAll.mockRejectedValue(new Error('Erro ao listar livros'));
    
            const res = await request(app).get('/livros');
    
            expect(res.statusCode).toEqual(404);
            expect(res.body).toHaveProperty('message', 'Erro ao listar livros');
        });
    });
    

        it('deve retornar erro 500 se falhar ao listar livros', async () => {
            Livro.findAll.mockRejectedValue(new Error('Erro ao listar livros'));

            const res = await request(app).get('/livros');

            expect(res.statusCode).toEqual(500);
            expect(res.body).toHaveProperty('message', 'Erro ao listar livros');
        });
    });

    describe('GET /livros/:id', () => {
        it('deve retornar um livro pelo ID', async () => {
            const livro = { id: 1, titulo: 'Livro Teste' };
            Livro.findByPk.mockResolvedValue(livro);

            const res = await request(app).get('/livros/1');

            expect(res.statusCode).toEqual(200);
            expect(res.body).toEqual(livro);
            expect(Livro.findByPk).toHaveBeenCalledWith("1");
        });

        it('deve retornar erro 404 se o livro não for encontrado', async () => {
            Livro.findByPk.mockResolvedValue(null);

            const res = await request(app).get('/livros/1');

            expect(res.statusCode).toEqual(404);
            expect(res.body).toHaveProperty('message', 'Livro não encontrado');
        });

        it('deve retornar erro 500 se falhar ao buscar livro', async () => {
            Livro.findByPk.mockRejectedValue(new Error('Erro ao buscar livro'));

            const res = await request(app).get('/livros/1');

            expect(res.statusCode).toEqual(500);
            expect(res.body).toHaveProperty('message', 'Erro ao buscar livro');
        });
    });

    describe('POST /livros', () => {
        it('deve cadastrar um novo livro', async () => {
            const novoLivro = { id: 1, titulo: 'Novo Livro' };
            Livro.create.mockResolvedValue(novoLivro);

            const res = await request(app)
                .post('/livros')
                .send({ titulo: 'Novo Livro' });

            expect(res.statusCode).toEqual(201);
            expect(res.body).toEqual(novoLivro);
            expect(Livro.create).toHaveBeenCalledWith({ titulo: 'Novo Livro' });
        });

        it('deve retornar erro 500 se falhar ao criar livro', async () => {
            Livro.create.mockRejectedValue(new Error('Erro ao criar livro'));

            const res = await request(app)
                .post('/livros')
                .send({ titulo: 'Novo Livro' });

            expect(res.statusCode).toEqual(500);
            expect(res.body).toHaveProperty('message', 'Erro ao criar livro');
        });
    });

    describe('PUT /livros/:id', () => {
        it('deve atualizar um livro existente', async () => {
            
            const livroAtualizado = { id: 1, titulo: 'Livro Atualizado' };
            Livro.update.mockResolvedValue([1]);  
            Livro.findByPk.mockResolvedValue(livroAtualizado);

            const res = await request(app)
                .put('/livros/1')
                .send({ titulo: 'Livro Atualizado' });

            expect(res.statusCode).toEqual(200);
            expect(res.body).toEqual(livroAtualizado);
            expect(Livro.update).toHaveBeenCalledWith(
                { titulo: 'Livro Atualizado' },
                { where: { id: "1" } }
            );
        });

        it('deve retornar erro 404 se o livro a ser atualizado não for encontrado', async () => {
            Livro.update.mockResolvedValue([0]);  // 0 indica que o livro não foi encontrado

            const res = await request(app)
                .put('/livros/1')
                .send({ titulo: 'Livro Atualizado' });

            expect(res.statusCode).toEqual(404);
            expect(res.body).toHaveProperty('message', 'Livro não encontrado');
        });

        it('deve retornar erro 500 se falhar ao atualizar livro', async () => {
            Livro.update.mockRejectedValue(new Error('Erro ao atualizar livro'));

            const res = await request(app)
                .put('/livros/1')
                .send({ titulo: 'Livro Atualizado' });

            expect(res.statusCode).toEqual(500);
            expect(res.body).toHaveProperty('message', 'Erro ao atualizar livro');
        });
    });

    describe('DELETE /livros/:id', () => {
        it('deve deletar um livro existente', async () => {
            Livro.destroy.mockResolvedValue(1);  // 1 indica que o livro foi deletado

            const res = await request(app).delete('/livros/1');

            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('message', 'Livro deletado com sucesso');
            expect(Livro.destroy).toHaveBeenCalledWith({ where: { id: "1" } });
        });

        it('deve retornar erro 404 se o livro a ser deletado não for encontrado', async () => {
            Livro.destroy.mockResolvedValue(0);  // 0 indica que o livro não foi encontrado

            const res = await request(app).delete('/livros/1');

            expect(res.statusCode).toEqual(404);
            expect(res.body).toHaveProperty('message', 'Livro não encontrado');
        });

        it('deve retornar erro 500 se falhar ao deletar livro', async () => {
            Livro.destroy.mockRejectedValue(new Error('Erro ao deletar livro'));

            const res = await request(app).delete('/livros/1');

            expect(res.statusCode).toEqual(500);
            expect(res.body).toHaveProperty('message', 'Erro ao deletar livro');
        });
    });
