import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';;
import { Button } from './index';

it('calls onClick when clicked', async () => {
  const user = userEvent.setup();
  const onClick = vi.fn();

  render(<Button onClick={onClick}>Comprar</Button>);

  await user.click(screen.getByRole('button', { name: /Comprar/i }));
  expect(onClick).toHaveBeenCalledTimes(1);
});
