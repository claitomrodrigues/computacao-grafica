class MeuJogo extends JS_CG_2D_API {
    acaoAoIniciar() {
        this.teclas = { esquerda: false, direita: false };
        this.larguraMundo = 3200;
        this.cameraX = 0;
        this.plataformas = [
            { x: 0, y: 500, largura: 550, altura: 100 },
            { x: 300, y: 400, largura: 160, altura: 30 },
            { x: 640, y: 470, largura: 160, altura: 30 },
            { x: 860, y: 420, largura: 150, altura: 30 },
            { x: 1080, y: 460, largura: 230, altura: 140 },
            { x: 1400, y: 400, largura: 150, altura: 30 },
            { x: 1610, y: 350, largura: 160, altura: 30 },
            { x: 1830, y: 430, largura: 240, altura: 170 },
            { x: 2150, y: 390, largura: 150, altura: 30 },
            { x: 2370, y: 330, largura: 150, altura: 30 },
            { x: 2590, y: 430, largura: 610, altura: 170 }
        ];
        this.jogador = new Personagem(100, 300, 40, 60, this.plataformas);
    }

    teclaPressionada(e) {
        if (e.code === "ArrowLeft" || e.code === "KeyA") this.teclas.esquerda = true;
        if (e.code === "ArrowRight" || e.code === "KeyD") this.teclas.direita = true;
        if (e.code === "ArrowUp" || e.code === "KeyW") this.jogador.pular();
    }

    teclaLiberada(e) {
        if (e.code === "ArrowLeft" || e.code === "KeyA") this.teclas.esquerda = false;
        if (e.code === "ArrowRight" || e.code === "KeyD") this.teclas.direita = false;
    }

    atualizar() {
        const direcao = (this.teclas.direita ? 1 : 0) - (this.teclas.esquerda ? 1 : 0);
        const novaPosicaoX = this.jogador.getX() + direcao * 4;
        this.jogador.setX(Math.max(0, Math.min(novaPosicaoX, this.larguraMundo - 40)));
        this.jogador.atualizar();

        if (this.jogador.getY() > this.alturaTela() + 100) {
            this.jogador.setX(100);
            this.jogador.setY(300);
            this.jogador.prevY = 300;
            this.jogador.velY = 0;
        }

        this.cameraX = Math.max(
            0,
            Math.min(
                this.jogador.getX() + 20 - this.larguraTela() / 2,
                this.larguraMundo - this.larguraTela()
            )
        );
    }

    desenhar() {
        this.limparTela("skyblue");
        this.empilhar();
        this.transladar(-this.cameraX, 0);
        for (const plataforma of this.plataformas) {
            this.preenchimento(plataforma.altura > 30 ? "saddlebrown" : "green");
            this.retangulo(
                plataforma.x,
                plataforma.y,
                plataforma.largura,
                plataforma.altura,
                Estilo.PREENCHIDO
            );
        }
        this.preenchimento("red");
        this.retangulo(this.jogador.getX(), this.jogador.getY(), 40, 60, Estilo.PREENCHIDO);
        this.desempilhar();
    }
}

window.addEventListener("load", () => {
    new MeuJogo("Meu Primeiro Jogo com Plataforma", "meuCanvas", 800, 600);
});