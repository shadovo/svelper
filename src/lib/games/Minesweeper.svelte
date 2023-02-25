<script lang="ts">
	type Cell = {
		isMine: boolean;
		isRevealed: boolean;
		isFlagged: boolean;
		adjacentMines: number;
	};
	type Board = Cell[][];

	type GameStatus = 'notstarted' | 'playing' | 'won' | 'lost';

	type Game = {
		status: GameStatus;
		board: Board;
		width: number;
		height: number;
		mines: number;
		currentTimer: string;
		startTime: Date | null;
		endTime: Date | null;
	};

	export let width = 9;
	export let height = 10;
	export let mines = 10;

	let game: Game;

	function createGame(width: number, height: number, mines: number) {
		const board: Cell[][] = [];
		for (let y = 0; y < height; y++) {
			board[y] = [];
			for (let x = 0; x < width; x++) {
				board[y][x] = {
					isMine: false,
					isRevealed: false,
					isFlagged: false,
					adjacentMines: 0,
				};
			}
		}

		let minesPlaced = 0;
		while (minesPlaced < mines) {
			const x = Math.floor(Math.random() * width);
			const y = Math.floor(Math.random() * height);
			if (!board[y][x].isMine) {
				board[y][x].isMine = true;
				minesPlaced++;
			}
		}

		for (let y = 0; y < height; y++) {
			for (let x = 0; x < width; x++) {
				if (board[y][x].isMine) {
					continue;
				}
				let adjacentMines = 0;
				for (let dy = -1; dy <= 1; dy++) {
					for (let dx = -1; dx <= 1; dx++) {
						if (dx === 0 && dy === 0) {
							continue;
						}
						const nx = x + dx;
						const ny = y + dy;
						if (nx < 0 || nx >= width || ny < 0 || ny >= height) {
							continue;
						}
						if (board[ny][nx].isMine) {
							adjacentMines++;
						}
					}
				}
				board[y][x].adjacentMines = adjacentMines;
			}
		}

		game = {
			status: 'notstarted',
			board: board,
			currentTimer: '00:00',
			startTime: null,
			endTime: null,
			width,
			height,
			mines,
		};
	}

	function gameOver() {
		game.status = 'lost';
		game.endTime = new Date();
		game.board = game.board.map((row) =>
			row.map((cell) => ({
				...cell,
				isRevealed: cell.isRevealed || cell.isMine,
			})),
		);
	}

	function gameWin() {
		game.status = 'won';
		game.endTime = new Date();
		game.board = game.board.map((row) =>
			row.map((cell) => ({
				...cell,
				isFlagged: cell.isFlagged || cell.isMine,
			})),
		);
	}

	function checkGameWin() {
		return (
			game.width * game.height - game.mines ===
			game.board.flat().filter((cell) => cell.isRevealed).length
		);
	}

	function cellRightClicked(x: number, y: number) {
		if (game.board[y][x].isRevealed) {
			return;
		}
		game.board[y][x].isFlagged = !game.board[y][x].isFlagged;
	}

	function cellClicked(x: number, y: number) {
		if (game.board[y][x].isRevealed || game.board[y][x].isFlagged) {
			return;
		}
		if (game.status === 'notstarted') {
			game.status = 'playing';
			game.startTime = new Date();
			updateTimer();
		}
		game.board[y][x].isRevealed = true;
		if (game.board[y][x].isMine) {
			gameOver();
			return;
		}
		if (game.board[y][x].adjacentMines === 0) {
			for (let dy = -1; dy <= 1; dy++) {
				for (let dx = -1; dx <= 1; dx++) {
					if (dx === 0 && dy === 0) {
						continue;
					}
					const nx = x + dx;
					const ny = y + dy;
					if (nx < 0 || nx >= game.board[0].length || ny < 0 || ny >= game.board.length) {
						continue;
					}
					cellClicked(nx, ny);
				}
			}
		}
		if (checkGameWin()) {
			gameWin();
		}
	}

	function updateTimer() {
		if (game.status === 'playing') {
			const seconds = Math.floor((new Date().getTime() - game.startTime!.getTime()) / 1000);
			const minutes = Math.floor(seconds / 60);
			const secondsLeft = seconds % 60;
			const secondsString = secondsLeft < 10 ? `0${secondsLeft}` : `${secondsLeft}`;
			const minutesString = minutes < 10 ? `0${minutes}` : `${minutes}`;
			game.currentTimer = `${minutesString}:${secondsString}`;
		}
		setTimeout(updateTimer, 1000);
	}

	createGame(width, height, mines);
</script>

<div class="board">
	<div class="stats">
		<div class="stat">
			<span class="value"
				>{game.mines - game.board.flat().filter((cell) => cell.isFlagged).length}</span
			>
		</div>
		<div class="stat">
			<button on:click={() => createGame(width, height, mines)}>
				{#if game.status === 'notstarted' || game.status === 'playing'}
					🙂
				{:else if game.status === 'won'}
					😎
				{:else if game.status === 'lost'}
					😵
				{/if}
			</button>
		</div>
		<div class="stat">
			<span class="value">{game.currentTimer}</span>
		</div>
	</div>
	<table>
		<tbody>
			{#each game.board as row, i}
				<tr>
					{#each row as cell, j}
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<td
							on:click={() => cellClicked(j, i)}
							on:contextmenu|preventDefault={() => cellRightClicked(j, i)}
							class:revealed={cell.isRevealed}
							class:mine={cell.isRevealed && cell.isMine}
						>
							{#if cell.isRevealed}
								{#if cell.isMine}
									💣
								{:else if cell.adjacentMines > 0}
									{cell.adjacentMines}
								{:else}
									&nbsp;
								{/if}
							{:else if cell.isFlagged}
								🚩
							{:else}
								&nbsp;
							{/if}
						</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style lang="scss">
	.board {
		width: auto;
		display: inline-block;
		padding: var(--gap);
		border: 3px solid var(--c-text);
		--c-revealed: #ccc8;
	}

	@media (prefers-color-scheme: dark) {
		.board {
			--c-revealed: #8888;
		}
	}

	.stats {
		display: flex;
		justify-content: space-around;
		align-items: center;
		margin-bottom: var(--gap);
		font-size: 1.5rem;

		.stat {
			flex: 1;
			text-align: center;

			.value {
				display: block;
				font-weight: bold;
			}
		}

		button {
			border: 3px solid var(--c-text);
			font-size: 1.5rem;
			margin: 0 auto;
		}
	}

	table {
		border-collapse: collapse;
		user-select: none;
		font-weight: bold;
	}

	td {
		width: 2.5em;
		height: 2.5em;
		text-align: center;
		border: 1px solid #ccc;
		cursor: pointer;

		&:not(.revealed):hover {
			background-color: rgba(125, 125, 125, 0.2);
		}

		span {
			display: block;
			width: 100%;
			height: 100%;
		}
	}

	.revealed {
		background-color: var(--c-revealed);
	}
	.empty {
		background-color: #ccc;
	}
	.mine {
		background-color: #f00;
	}
</style>
