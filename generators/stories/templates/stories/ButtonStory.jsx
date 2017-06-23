import React from 'react';
import { action, storiesOf } from '@kadira/storybook';
import Button from './Button';

export default () => {
  storiesOf('Button', module)
    .add('with text', () => (
      <Button onClick={action('clicked')}>Hello Button</Button>
    ))
    .add('with some emoji', () => (
      <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>
    ));
};
