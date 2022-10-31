import React from 'react';
import style from './ClassComponent.module.css';
import propTypes from 'prop-types';

export class ClassComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: 'Результат',
      userNumber: '',
      randomNumber: Math.floor(
        Math.random() * (this.props.max - this.props.min) + this.props.min
      ),
      newGame: false,
      count: 0,
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    e.target.user_number.value = '';
    this.setState((state) => ({
      count: this.state.count + 1,
    }));

    this.setState((state) => {
      if (!state.userNumber) {
        return {
          result: 'Введите число',
        };
      }

      if (state.userNumber > state.randomNumber) {
        return {
          result: `${state.userNumber} больше загаданного`,
          userNumber: '',
        };
      }

      if (state.userNumber < state.randomNumber) {
        return {
          result: `${state.userNumber} меньше загаданного`,
          userNumber: '',
        };
      }
      console.log(state.count);
      return {
        result: `Вы угадали, загаданное число ${state.userNumber},
        количество попыток ${state.count}`,
        userNumber: '',
        newGame: true,
      };
    });
  };

  handleChange = (e) => {
    this.setState({
      userNumber: e.target.value,
    });
  };

  newGame = (e) => {
    this.setState((state) => ({
      userNumber: '',
      newGame: false,
      randomNumber: state.random,
      result: 'Результат',
      count: 0,
    }));
  };

  render() {
    return (
      <div className={style.game}>
        <p className={style.result}>{this.state.result}</p>
        {this.state.newGame ? (
          <button className={style.btn} onClick={this.newGame}>
            Сыграть еще
          </button>
        ) : (
          <form className={style.form} onSubmit={this.handleSubmit}>
            <label className={style.label} htmlFor="user_number">
              Угадай число
            </label>
            <input
              className={style.input}
              type="number"
              id="user_number"
              onChange={this.handleChange}
              value={this.state.userNumber}
            />
            <button className={style.btn}>Угадать</button>
          </form>
        )}
      </div>
    );
  }
}

ClassComponent.propTypes = {
  min: propTypes.number,
  max: propTypes.number,
};
